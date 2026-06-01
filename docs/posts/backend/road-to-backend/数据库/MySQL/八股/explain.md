---
title: 'explain'
date: 2024-11-18
updated: '2024-11-18 12:23:04'
category: 'backend'
tags:
  - '后端修仙之路'
  - '数据库'
  - 'MySQL'
lastUpdated: false
summary: 'type 字段描述了MySQL如何查找表中的行，也称为“访问类型”或“连接类型”。这是 EXPLAIN 输出中最重要的字段之一，直接反映了查询的效率。'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/hqq59pdqfpd5cqwn'
---

# explain

***

### 1. `type` 字段

`type` 字段描述了MySQL如何查找表中的行，也称为“访问类型”或“连接类型”。这是 `EXPLAIN` 输出中最重要的字段之一，直接反映了查询的效率。

**性能从最优到最差的顺序为：**
`system > const > eq_ref > ref > fulltext > ref_or_null > index_merge > unique_subquery > index_subquery > range > index > ALL`

下面是常见值的详细解释：

| type 值 | 解释说明 | 性能 | 常见情况 |
| :--- | :--- | :--- | :--- |
| **system** | 最高级别。表只有一行数据（系统表），是 `const` 类型的特例。 | **最优** | 查询系统表或只有一行的表。 |
| **const** | 表示通过索引一次就找到了。通常用于主键或唯一索引的等值查询，结果最多只有一行。 | **极好** | `SELECT * FROM tbl WHERE primary_key = 1;` |
| **e&#x71;****\_****&#x72;ef** | 通常出现在多表连接（JOIN）中。对于前一张表的每一行，后一张表都只有一行与之匹配。连接字段通常是主键或唯一索引。 | **优秀** | `SELECT * FROM table1 JOIN table2 ON table1.id = table2.ref_id;` (其中 `table2.ref_id` 是主键或唯一索引) |
| **ref** | 非唯一性索引扫描。返回匹配某个单独值的所有行。它可能找到多行，所以效率比 `eq_ref` 差。 | **良好** | `SELECT * FROM tbl WHERE non_unique_key = 'some_value';` |
| **re&#x66;****\_****&#x6F;&#x72;****\_****&#x6E;ull** | 类似于 `ref`，但MySQL会额外搜索包含 `NULL` 值的行。 | **良好** | `SELECT * FROM tbl WHERE non_unique_key = 'some_value' OR non_unique_key IS NULL;` |
| **inde&#x78;****\_****&#x6D;erge** | 表示查询使用了索引合并优化。MySQL会使用多个单列索引来组合定位行，然后将结果集合并。 | **较好** | `SELECT * FROM tbl WHERE key1 = 'val1' OR key2 = 'val2';` (当 `key1` 和 `key2` 都有独立索引时) |
| **range** | 索引范围扫描。这是最常见的索引使用方式之一，用于带有范围条件的查询，如 `BETWEEN`, `>`, `<`, `IN` 等。 | **一般** | `SELECT * FROM tbl WHERE id > 100;` |
| **index** | 全索引扫描 (Full Index Scan)。它会遍历整个索引树来查找数据，而不是根据条件直接定位。通常比 `ALL` 快，因为索引文件通常比表数据文件小。 | **较差** | 1. 查询的列全部在索引中（覆盖索引），但没有 `where` 条件。`SELECT key_col FROM tbl;`    2. 按索引排序。`SELECT * FROM tbl ORDER BY key_col;` |
| **ALL** | 全表扫描 (Full Table Scan)。MySQL将遍历整张表来找到匹配的行。这是最坏的情况，数据量大时性能极差。 | **最差** | 查询没有使用任何索引。 |

**优化建议：** 你的目标是让查询的 `type` 级别尽可能高，至少达到 `range` 级别，最好是 `ref` 或 `eq_ref`。如果出现 `ALL`，通常意味着需要添加或优化索引。

***

### 2. `possible_keys` 字段

这个字段很简单，它指出了在该查询中，MySQL **可以** 使用哪些索引来帮助查找。

| 值 | 解释说明 |
| :--- | :--- |
| **索引名称列表** | 显示一个或多个可用的索引名称，以逗号分隔。 |
| **NULL** | 表示没有找到任何可以使用的索引。 |

**注意：** `possible_keys` 只是理论上可用的索引。查询优化器会根据成本估算等因素决定最终是否使用它们。因此，这里有值，但 `key` 字段为 `NULL` 的情况是可能发生的。

***

### 3. `key` 字段

这个字段显示了MySQL **实际决定使用** 的索引。如果为 `NULL`，则表示没有使用任何索引。

| 值 | 解释说明 |
| :--- | :--- |
| **索引名称** | 实际被查询优化器选中的索引名称。 |
| **NULL** | 查询没有使用索引。可能是没有可用索引，或者优化器认为全表扫描更快（例如，表数据很少）。 |

**优化建议：** 理想情况下，`key` 字段应该有一个合适的索引值。如果 `possible_keys` 中有索引而 `key` 为 `NULL`，可以尝试使用 `FORCE INDEX` 来强制使用索引，并观察性能变化，但这通常是最后的手段。

***

### 4. `extra` 字段

`extra` 字段包含了不适合在其他字段中显示但对性能评估至关重要的额外信息。它是判断查询优劣的重要参考。

下面是一些常见且重要的值：

| extra 值 | 解释说明 | 性能影响 |
| :--- | :--- | :--- |
| **Using index** | **非常好**。表示查询使用了“覆盖索引”（Covering Index）。查询所需的所有列都直接从索引树中获取，无需回表查询实际的数据行，速度极快。 | **好** |
| **Using where** | 表示MySQL服务器层在存储引擎返回数据后，还需要进行额外的条件过滤。这很常见，不一定代表性能问题。 | **中性** |
| **Using index condition** | **索引下推 (ICP)**。这是MySQL 5.6引入的优化。在仅访问索引即可判断部分`WHERE`条件的情况下，服务器把这部分判断下推到存储引擎层，从而减少存储引擎返回给服务器的行数。这是一个很好的信号。 | **好** |
| **Using filesort** | **非常糟糕**。表示MySQL必须进行一个外部的索引排序，而不是按照索引的自然顺序读取。当 `ORDER BY` 的字段没有合适的索引时，通常会出现此情况。它会消耗大量CPU和内存，大数据量时甚至会产生磁盘I/O。 | **差 (严重)** |
| **Using temporary** | **非常糟糕**。表示MySQL为了处理查询，必须创建一个临时表。通常出现在 `GROUP BY` 和 `ORDER BY` 的列不同，或者 `DISTINCT` 和 `UNION` 等操作中。临时表可能在内存中，也可能在磁盘上，性能开销很大。 | **差 (严重)** |
| **Using join buffer (Block Nested Loop)** | **糟糕**。在多表连接时，如果连接字段没有索引，MySQL会使用块嵌套循环算法，将驱动表的行读入内存缓冲区（join buffer），然后扫描被驱动表与缓冲区中的数据进行匹配。这是一种效率低下的连接方式。 | **差** |
| **Impossible WHERE** | `WHERE` 子句的条件永远为假，查询不会返回任何行。 | **中性** (通常是逻辑错误) |
| **Select tables optimized away** | **极好**。当MySQL仅通过索引（例如，查询`COUNT(*)`时使用二级索引）就能完成查询时，会显示这个信息，表示根本没有访问表数据。 | **极好** |

**优化建议：** 重点关注 `extra` 字段中是否出现了 `Using filesort` 和 `Using temporary`。如果出现，它们通常是性能瓶颈的根源，需要通过优化索引或重写SQL来解决。同时，力争实现 `Using index`（覆盖索引）是提升查询性能的绝佳方式。

### 总结

在分析 `EXPLAIN` 结果时，你可以遵循以下思路：

1. \*\*看 \*\*`type`：确保其级别足够高，避免 `ALL` 和 `index`。
2. \*\*看 \*\*`key`：确认是否使用了预期的索引。
3. \*\*看 \*\*`extra`：警惕 `Using filesort` 和 `Using temporary` 的出现，并争取 `Using index`。
4. \*\*看 \*\*`rows`（未在问题中提及，但很重要）：预估扫描的行数，这个数字越小越好。

---

> 更新: 2024-03-23 15:24:40  
> 来源: 语雀导出
