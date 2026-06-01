---
title: 'Bean注入方式'
date: 2024-09-06
updated: '2024-09-06 07:00:37'
category: 'backend'
tags:
  - '后端修仙之路'
  - 'Java'
  - 'JavaWeb'
lastUpdated: false
summary: '1. @Autowired注解'
source: '语雀导出'
source_url: 'https://www.yuque.com/pohongying/cnhh4c/zprvefpavuy9tx9f'
---

# Bean注入方式

### Bean注入方式

1. `@Autowired`**注解**
   * 字段注入：直接在字段上使用`@Autowired`。
   * 构造器注入：在构造器上使用`@Autowired`。
   * Setter方法注入：在Setter方法上使用`@Autowired`。
2. `@Resource`**注解**
   * 默认按名称注入，可指定`name`属性。
3. `@Inject`**注解**
   * 功能与`@Autowired`类似，需引入`javax.inject`依赖。
4. `@Value`**注解**
   * 用于注入配置文件中的值或表达式。
5. `@Bean`**方法**
   * 在配置类中定义Bean，手动注入。
6. **自动扫描**
   * 使用`@Component`、`@Service`、`@Controller`、`@Repository`等注解，Spring自动扫描并注入。
7. `@Qualifier`**注解**
   * 指定注入的Bean名称，解决多Bean冲突。
8. `@Primary`**注解**
   * 标记优先注入的Bean，简化多Bean注入逻辑。

这些注入方式各有特点，开发者可以根据实际需求选择合适的方式。

---

> 更新: 2023-06-25 12:34:43  
> 来源: 语雀导出
