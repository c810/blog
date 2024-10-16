# 准备

## 应用环境

### 第一阶段：MySQL 和 Redis

将 `big-market-one` 文件夹放到服务器：

```bash
cd /dev-ops/
# 将 big-market-one 上传到这，然后：
cd big-market-one/dev-ops/
ls
chmod +x docker-compose-environment.yml
# 然后看一下 docker-compose-environment.yml 这个文件，可以修改一下 mysql 等应用的密码，然后：
docker-compose -f docker-compose-environment.yml up -d
```

对于 `docker-compose-app.yml`，如果与 `docker-compose-environment.yml` 都在统一网络 networks 下，并且都在这个包（dev-ops）下，那么就可以用名称的方式去连接。即，在 `docker-compose-app.yml` 中，就可以直接写 mysql、redis 等 `docker-compose-environment.yml` 中的名字，用名字连接说明走的是内部，也就是用冒号后面的端口号。

然后就可以登录 portainer：http://117.72.86.192:9000，用户名为 admin，密码超过 12 位。

![[image-20240928222028042.png]]

然后需要到云服务器平台中添加防火墙规则。

phpMyAdmin：http://117.72.86.192:8899，用户名为 admin。

redis commander：http://117.72.86.192:8081，用户名为 admin。

当然，mysql 也可以直接开放端口，然后用 navicat 直接连接。redis 也一样，可以用 RESP 连接。



## 使用脚手架创建工程

直接创建 DDD 脚手架。

app：工程的启动、配置

domain：具体业务逻辑。不同的领域（抽奖领域、积分领域等）

infrastructure：技术层？，提供数据服务（持久化数据：MySQL、Redis；）、动态配置中心、文件查询、接口调用。

通过依赖倒置的方式，让 domain 来查询。domain 只做接口，不做具体实现，让 infrastructure 做具体实现，然后通过注入的方式进行处理。domain 不依赖别人，都是被引用的。infrastructure 和 trigger 都引用 domain。app 要启动的话，需要引用 infrastructure 和 trigger，即 pom 中要引入它俩。

trigger：触发器，接收所有的触发动作，HTTP 请求、mq 请求、任务调度。这里先暂时去掉了 case 部分，那么编排也在 trigger 中实现即可。

types：





## Git

直接在 IDEA 中的 VCS 中，创建 Git 仓库。

去 GitHub 中创建一个远程仓库。

在 IDEA 中，选中 `README.md` 文件，右键 Git-> Add，然后 `Ctrl + K` 提交：`docs: 文档说明`。

然后将 `data` 和 `idea` 文件夹右键添加到 `gitignore` 中。然后将其他的选中（这时就不需要选中 `README.md` 了），右键添加，提交：`feat: init project`。

然后 `Ctrl + Shift + K` 推送，第一次会要求填写 origin 远程仓库地址，就用 http 的地址就行。





# 开发



## 抽奖策略领域和库表设计

https://articles.zsxq.com/id_1rsa1kzhx52l.html

![[FneS159mh275DXpKFwFuvHQ8AO_t.png]]





### 库表设计

这里有三张表：

- strategy：策略表，也就是策略的总表，都有啥策略，我可以选其中的某种策略。

- strategy_award：不同策略下，各种奖品的具体详情，比如 100001 策略下，各 award 的名称、奖品数量、剩余库存、概率、规则模型等。
  - rule_models：规则模型【tree_luck_award、tree_lock_1、tree_lock_2、tree_lock_3 等】
    - 这些基本就是在规则树中了，属于抽奖中的，有别于下面 strategy_rule 表中的规则模型，那里的规则模型，是权重规则和黑名单规则，属于抽奖前的。



然后这时考虑到，还需要给各个奖品配置不同的规则，比如，有的奖品需要抽 3 次之后再解锁。

那么，就需要创建一个 strategy_award_rule 表。



当然，这个表里也有可能存策略的某些规则，比如：有的会有权重规则，你抽过 60 次后，就可以将最差的那个奖去掉。

因此，我们不能叫 strategy_award_rule，而是 strategy_rule 即可。



- strategy_rule：在 strategy_rule 中，rule_type 字段使用 1 代表策略规则、2 代表奖品规则。（其实，后面，这个表就只用于存放策略规则了，TODO）
  - rule_model：规则模型【rule_weight、rule_blacklist】
  - rule_value：规则值
    - rule_weight 的话，就是 60:102,103,104,105 200:106,107 1000:105，表示抽够 60、200、1000 次，奖品的范围。
    - rule_blacklist 的话，就是 101: user001, user002, user003，表示黑名单用户以及给他们的兜底奖品。





## 基础层持久化数据

就是创建数据库表对应的 PO 类，已经 DAO 和 mapper.xml。（第一次会写一下过程，后续就会省略）

### 创建分支

先创建分支

一节课程创建一个新的分支，这样即使写错了，还可以回滚。

1. 在 Local 的 main 分支右键新建 `240928-lhp-orm` 分支，创建好之后就自动切换到这个分支上了。
2. 创建分支后，可以 `Ctrl + Shift + K` 提交你的分支到仓库中（也可以开发完成后再 push）。
3. 开发完成后，确保功能都验证正常，可以把分支合并到 master 分支上，再提交一次。也就是图中 Merge 只不过是在你的分支上右键以后，点击 Merge xxx into master

### 创建 PO 类

在 infrastructure 下的 po 中创建 **PO 数据库持久化对象**，一般在 po 包下创建 PO 时，PO 可以省略，默认就是 PO 对象。

里面属性对应数据库表中的字段。

类上需要加 `@Data`。

```Java
@Data
public class Award {
    /** 自增ID */
    private Long id;
    /** 抽奖奖品ID - 内部流转使用 */
    private Integer awardId;
    /** 奖品对接标识 - 每一个都是一个对应的发奖策略 */
    private String awardKey;
    /** 奖品配置信息 */
    private String awardConfig;
    /** 奖品内容描述 */
    private String awardDesc;
    /** 创建时间 */
    private Date createTime;
    /** 更新时间 */
    private Date updateTime;
}
```

### 创建对应的 Dao 接口

在 infrastructure 下的 dao 中创建 **Dao 接口**。

接口上需要加 `@Mapper`。

```Java
@Mapper
public interface IAwardDao {
}
```

![[image-20240928233631459.png]]

### 创建对应的 mapper.xml 文件

在 app 下的 resource/mybatis/mapper 中创建 **mapper.xml 文件**。

然后写个查询语句，用来测试。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE mapper PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN" "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="pub.lhp.infrastructure.dao.IAwardDao">

    <resultMap id="dataMap" type="pub.lhp.infrastructure.dao.po.Award">
        <id column="id" property="id"/>
        <result column="award_id" property="awardId"/>
        <result column="award_key" property="awardKey"/>
        <result column="award_config" property="awardConfig"/>
        <result column="award_desc" property="awardDesc"/>
        <result column="create_time" property="createTime"/>
        <result column="update_time" property="updateTime"/>
    </resultMap>

    <select id="queryAwardList" resultMap="dataMap">
        select award_id, award_key, award_config, award_desc
        from award
        limit 10
    </select>

</mapper>
```

![[image-20241001103747607.png]]

### 在 Dao 接口中添加对应的方法声明

与 mapper.xml 中的方法名相同。

```Java
@Mapper
public interface IAwardDao {
    List<Award> queryAwardList();
}
```

### 修改 application 配置文件

检查并修改 app 下的 `application-dev.yml` 文件。

```yaml
# 数据库配置；启动时配置数据库资源信息
spring:
  datasource:
    username: root
    password: xxxxxx
    url: jdbc:mysql://117.72.86.192:13306/big_market?useUnicode=true&characterEncoding=utf8&autoReconnect=true&zeroDateTimeBehavior=convertToNull&serverTimezone=UTC&useSSL=true
    driver-class-name: com.mysql.cj.jdbc.Driver
    
    
    
# MyBatis 配置【如需使用记得打开】
mybatis:
  mapper-locations: classpath:/mybatis/mapper/*.xml
  config-location:  classpath:/mybatis/config/mybatis-config.xml
```



### 单元测试

在 app 下的 test 中，创建要测试方法对应的包，然后编写测试代码。

需要添加

例如，要测试 infrastructure 下的 IAwardDao 接口中的方法，就先建一个 infrastructure 包，然后创建 AwardDaoTest 类：

```Java
// @Slf4j: 这是Lombok库提供的一个注解，它会自动生成一个名为log的Logger对象，方便在类中进行日志记录。
// @RunWith(SpringRunner.class): 指定运行器为SpringRunner，这样可以支持Spring TestContext Framework的功能。
// @SpringBootTest: 表示这是一个Spring Boot应用的集成测试，它将启动整个Spring应用上下文来执行测试。
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class AwardDaoTest {

    // 注入奖品持久化 DAO
    @Resource
    private IAwardDao awardDao;

    @Test
    public void testQueryAwardList() {
        List<Award> awards = awardDao.queryAwardList();
        // 将奖品列表转换成JSON字符串格式输出
        log.info("奖品列表: {}", JSON.toJSONString(awards));
    }
}
```

### 提交并合并分支

**提交并推送代码**

测试通过后，提交代码。

先 `Ctrl + K` 提交：`feat: 基础层持久化数据`，然后 `Ctrl + Shift + K` 推送。

**合并到 main 分支**

先 check out 切换到 main 分支，然后右键需要合并的分支，然后 merge 合并到 main。

这里相当于在本地合并了，所以还需要推送 main 到远端，也就是再 `Ctrl + Shift + K` 推送到远程仓库即可。





## 策略概率装配处理

### 思路

#### 流程

![[FhiurFVHAoOjhR0p7WD39A-HHr4i.png]]

#### 关于抽奖算法知识

抽奖的算法一种是空间换时间，另外一总是时间换空间。映射到方案上，空间换时间，是提前计算好抽奖概率分布，用本地内存 guava 或者 redis 存储，最后抽奖的时候通过生成的随机值，在空间内定位即可，复杂度为 O(1)。

但要注意，本地内存更快，Redis 相对慢一些。但 Redis 可以直接解决分布式存储问题，本地内存需要让多台分布式机器都保持数据的同步更新，需要引入配置中心以及定时检测的手段，来处理应用 **启动前/运行中**，对活动 **新增/变更** 做本地内存做数据加载处理（大厂中一些非常高并发的场景，会申请内存更大的机器来做这样的事情）。

另外一种是时间换空间，就是抽奖的计算，可以抽奖的时候生成一个随机值，之后和概率范围 for 循环比对。这样的场景适合那种需要，非常大的空间存放抽奖概率，不划算的时候，可以考虑这种。也可以在程序中设定，当总概率值超过 100 万，则不存储，而是改为循环比对。但，一切的手段，都要与实际诉求来依赖。

![[FiJ42JDXPmkMSc19DG1TPl317JXP.png]]



### 创建分支

创建 `241001-lhp-strategy-armory` 分支。

### 引入 Redis

#### 引入 Redisson 依赖

在父 pom 中只定义版本，不做引用，只是管理，指定版本号。

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
    <version>3.26.0</version>
</dependency>
```

然后在需要使用 Redisson 的层（app、infrastructure）的 pom 中添加依赖。

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson-spring-boot-starter</artifactId>
</dependency>
```











#### 添加 Redis 服务相关代码

在 infrastructure 的 dao 中创建一个 redis 包。将 `IRedisService` 和 `RedissonService` 复制过来即可。我们所有的数据操作，都是基于仓储层 repository 对 redis 进行调用。



然后还要在 app 层的 config 中添加 `RedisClientConfig` 和 `RedisClientConfigProperties`，也是现成的，复制即可。

- `IRedisService`：Redis 服务的接口方法
- `RedissonService`：使用 Redisson 实现，需要注入 RedissonClient
- `RedisClientConfig`：Redis 相关配置，将 RedisClient 交给 Spring 管理，这样 `RedissonService` 就可以注入了。可以在这里设置密码等。
- `RedisClientConfigProperties`：Redis 配置的相关属性



#### 修改 application 配置文件

然后在 `application-dev.yml` 中添加 redis：

```yaml
# Redis
redis:
  sdk:
    config:
      host: 117.72.86.192
      port: 16379
      pool-size: 10
      min-idle-size: 5
      idle-timeout: 30000
      connect-timeout: 5000
      retry-attempts: 3
      retry-interval: 1000
      ping-interval: 60000
      keep-alive: true
      password: xxxxxx
```



#### 单元测试

```Java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class ApiTest {

    @Resource
    private IRedisService redisService;
    @Test
    public void test() {
        RMap<Object, Object> map = redisService.getMap("strategy_id_100001");
        map.put(1, 101);
        map.put(2, 101);
        map.put(3, 101);
        map.put(4, 102);
        map.put(5, 102);
        map.put(6, 102);
        map.put(7, 103);
        map.put(8, 103);
        map.put(9, 104);
        map.put(10, 105);
        log.info("测试结果：{}", redisService.getFromMap("strategy_id_100001", 1).toString());
    }

}
```

测试通过：

![[image-20241001160542013.png]]

![[image-20241001160623276.png]]

也就是，30% 中 101 奖品，30%中 102 奖品，...，10%中 105。







### 【】依赖倒置

依赖倒置原则（DIP）：高层不应该依赖底层，两者应该基于抽象；抽象不应该依赖细节，细节依赖抽象。

DDD 中的依赖倒置：

domain 层（上层）不应该依赖于 infrastructure 层（下层），而是两者应该基于抽象。

比如，domain 层的 strategy.service.armory.StrategyArmory 类中，不应该直接调用 infrastructure 层的 persistent.repository.StrategyRepository 类中的方法，而是应该在 StrategyArmory 类中注入 IStrategyRepository 接口，然后 Spring 框架可以帮助我们创建对象，并且可以帮助我们维护对象和对象之间的关系。

也就是将对象的创建权/管理权交出去了，不再使用硬编码的方式了。同时也把对象关系的管理权交出去了，也不再使用硬编码的方式了。像这种把对象的创建权交出去，把对象关系的管理权交出去，被称为控制反转 IoC。

控制反转（Inversion of Control，缩写为 IoC），是面向对象编程中的一种设计思想，可以用来降低代码之间的耦合度，符合依赖倒置原则。控制反转的核心是：**将对象的创建权交出去，将对象和对象之间关系的管理权交出去，由第三方容器来负责创建与维护**。



![[image-20241014205832039.png]]















### 代码开发



整体流程：

Test（app） --> IStrategyArmory（domain） --> StrategyArmory（domain） --> IStrategyRepository（domain） --> StrategyRepository（infrastructure） --> IStrategyAwardDao（infrastructure） --> strategy_award_mapper.xml（app）



具体来看：

StrategyArmoryTest --调用-> IStrategyArmory 的实现类 StrategyArmory 中的 assembleLotteryStrategy(Long strategyId) 方法

assembleLotteryStrategy(Long strategyId)方法中：

1. 查询策略配置
   1. 调用 IStrategyRepository 的实现类 StrategyRepository 中的 queryStrategyAwardList(Long strategyId) 方法
      1. 用来查询策略奖品列表。比如，strategyId 是 100002，也就是查询：
         1. ![[image-20241001235552622.png]]
      2. queryStrategyAwardList(Long strategyId) 方法中：
         1. 先查询缓存，看是否有 List \< StrategyAwardEntity > strategyAwardEntities 的缓存。
         2. 如果没有，则再去查询数据库，调用 IStrategyAwardDao 中的 queryStrategyAwardListByStrategyId(Long strategyId)方法
         3. 查到后，还要将它写入缓存，最后将其返回。
2. 获取最小概率值
   1. 经历上一步查到策略奖品列表后，就可以找到其中概率的最小值。
3. 获取概率值的总和
   1. 也可以计算出概率的总和。
4. 计算概率值的区间
   1. 用总和除以最小值，算出区间。
5. 生成策略奖品概率查找表「这里指需要在 list 集合中，存放上对应的奖品占位即可，占位越多等于概率越高」
6. 对存储的奖品进行乱序操作
7. 生成出 Map 集合，key 值，对应的就是后续的概率值。通过概率来获得对应的奖品 ID
8. 写入缓存



#### 工程结构

![[image-20241002092943838.png]]









## 策略权重概率装配

### 思路

在大营销平台的抽奖子模块中，需要满足用户抽奖 N 积分后，可中奖范围的设定。也就是说你总共消耗了 6000 积分抽奖了，那么接下来的抽奖就会有圈定到固定的奖品范围，不会让用户再抽到过低价值的奖品。那么这就需要我们在设计系统实现的时候，处理下不同策略规则权重的概率装配。

在流程实现中，我们需要结合上一节中的整体概率装配，按照接口单一原则进行拆分出装配和使用。之后在装配接口中重构装配操作，满足对权重策略的装配处理。—— 这里会在实体对象中填充充血方法。

![[FuevrtGsf5ERuujYm9ncJHMMNoL9.png]]



1. 集合着梳理的系统设计流程，将后续需要用到的权重抽奖规则，进行提前装配处理。
2. 所有装配的数据都会存放到 Redis Map 数据结构下。对于权重的策略装配为策略 ID+权重值组合。
3. 最终用户在从装配的工厂中执行抽奖的时候，则可以通过策略 ID 抽奖和策略 ID+权重值组合的方式抽奖。









## 责任链模式处理抽奖规则

![[image-20241015090708592.png]]

在前面的章节中，我们运用了策略模式、工厂模式、模板模式，来完成抽奖流程的定义和抽奖过程前、中、后，规则的过滤处理。但在我们规则处理的流程中，因为前置规则的校验含带了抽奖的行为处理，这样绑定到规则流程实现中会显得有些臃肿，让规则负责的事情变得更多。所以在本节会使用责任链模式进行优化完善，让整个代码流程变得更加清晰。



设计前我们需要思考 🤔 ，抽奖的前置规则在抽奖中是一个什么行为。其实它可以被抽象为一种策略行为，比如；黑名单抽奖策略、权重抽奖策略、白名单抽奖策略等。而这些策略规则是一种互斥行为，比如走了黑名单规则，就不应该在继续走权重规则了。那么对于这样的情况，责任链的设计就更加合适了。



1. 抽象原有的抽奖前规则，为责任链处理。
2. 责任链会顺序的将责任节点，通过责任链工厂，从库中读取的到的责任节点进行顺序填充到责任链上。
3. 注意；这样的工厂方式可以更好的根据不同的策略创建出所需的责任链。属于责任链 + 工厂的组合编写方式。



具体来讲：

1. 首先，需要有一个 ILogicChain 接口，用来定义 logic 方法（执行责任动作的方法）、next 方法、appendNext 方法。
   1. 而这里，因为我们这里不需要用户（程序员）去装配责任链，因此，用户不应该看到 ILogicChain 接口中的 next 方法、appendNext 方法。所以，我们可以将这两个方法写到另一个 ILogicChainArmory 接口中，然后让 ILogicChain 接口来继承 ILogicChainArmory 接口即可。这样，在调用ILogicChain 接口的logic方法时，就只会看到该接口下只有一个logic方法，而没有next 方法、appendNext 方法，这两个方法是在ILogicChainArmory 接口中，更方便用户理解，明白我不需要去主动调用next 方法和appendNext 方法。
2. 然后，写一个AbstractLogicChain 抽象类来实现 ILogicChain 接口。实现 next 方法、appendNext 方法，而 logic 方法不实现，要交给具体的责任节点实现。
   1. 在 Java 中，如果一个类声明它实现了某个接口，那么它必须提供该接口中所有抽象方法的具体实现。然而，有一种情况例外：当这个类本身也是一个抽象类时，它可以不为接口中的某些方法提供具体实现。这些未实现的方法可以被声明为 abstract，这样具体的实现就由继承自这个抽象类的非抽象子类来完成。
   2. AbstractLogicChain 已经提供了 next() 和 appendNext(ILogicChain next) 这两个方法的具体实现。但是，对于 logic(String userId, Long strategyId) 方法，AbstractLogicChain 并没有提供具体的实现，而是选择将其实现留给其子类。因此，AbstractLogicChain 实际上并不需要直接实现 logic 方法，因为它自己是抽象的。
   3. DefaultLogicChain 作为 AbstractLogicChain 的一个具体子类，它就必须实现 ILogicChain 接口中所有尚未在 AbstractLogicChain 中实现的方法，包括 logic 方法。
3. 所以，需要有不同的责任节点（BlackListLogicChain、RuleWeightLogicChain、DefaultLogicChain）来继承AbstractLogicChain抽象类，然后重写 logic 方法。
4. 最后，需要有一个DefaultChainFactory工厂类，来装配我们的责任链。



（TODO，怎么装配的呢，strategyChainGroup是怎么赋值的呢，put进去的）



## 抽奖规则树模型结构设计


本章节需要引入新的设计模式结构，解决先阶段中抽奖策略规则的中、后两部分执行问题。通过组合模式的规则引擎，让过滤节点可以满足一颗二叉树的结构，自由的组合和多分支链路的方式完成流程的处理。

### 流程设计

这里有一个矛盾点需要解决。对于抽奖策略的前置规则过滤是顺序一条链的，有一个成功就可以返回。比如；黑名单抽奖、权重人群抽奖、默认抽奖，总之它只能有一种情况，所以这样的流程是适合责任链的。

![[Pasted image 20241016130627.png]]


那么对于抽奖中到抽奖后的规则，它是一个非多分支情况的规则过滤。单独的责任链是不能满足的，如果是拆分开抽奖中规则和抽奖后规则分阶段处理，中间单独写逻辑处理库存操作。那么是可以实现的。但这样的方式始终不够优雅，配置化的内容较低，后续的规则开发仍需要在代码上改造。所以这里小傅哥会带着大家实现一版组合模式的决策树模型设计。

![[Pasted image 20241016130654.png]]

注意：设计模式是思想，就和学武术练太极一样，理论和实践是两回事。招式要随着场景因地制宜的变化，而不是生搬硬套一些设计模式的案例学习。

### 功能实现

#### 1. 工程结构

![[Pasted image 20241016130727.png]]

1. 在策略领域模型下，rule 规则部分，添加 tree 规则树模型。「后续 filte 就会过删掉了，只保存一个chain链路，一个tree组合」
2. 责任链的链路执行有它本身的优势，自身的实现就可以从一个链转入到下一个。那么对于普通策略规则的过滤一种是for循环顺序执行，另外一种借助组合模式的思想，创建出二叉树结构的调用链路关系。本节就是这种方式实现规则树模型。

#### 2. 决策树

**规则树模型**

![[Pasted image 20241016130803.png]]

1. RuleTreeVO 决策树的树根信息，标记出最开始从哪个节点执行「treeRootRuleNode」。
2. RuleTreeNodeVO 决策树的节点，这些节点可以组合出任意需要的规则树。
3. RuleTreeNodeLineVO 决策树节点连线，用于标识出怎么从一个节点到下一个节点。














# 部署

## 构建镜像

### 前端

#### 添加 `Dockerfile` 文件

这个文件不需要修改。

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN yarn config set registry 'https://registry.npmmirror.com/'
RUN yarn install

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM base AS runner
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/server ./.next/server

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```



#### 修改 `next.config.js` 文件

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    target: 'server',
    output: "standalone",
    env: {
        API_HOST_URL: process.env.API_HOST_URL
    },
}

module.exports = nextConfig
```



#### 添加 `build.sh` 文件

这里的 `lhp` 可以换成别的，但与后面推送到 Docker Hub 有关系。

```sh
docker build -t lhp/big-market-front-app:1.0
```



#### 修改 `.env.local` 文件

修改里面的 `API_HOST_URL` 为 `公网IP:端口`（记得开放端口）。

```
API_HOST_URL=http://117.72.86.192:8091
```



#### 运行 `build.sh`











## 前端

搭建好 vue3 后，继续往下进行。

安装 lucky-canvas 抽奖插件：

[在 Vue 中使用 | 基于 Js / TS / Vue / React / 微信小程序 / uni-app / Taro 的【大转盘 &amp; 九宫格 &amp; 老虎机】抽奖插件](https://100px.net/usage/vue.html '🎉基于 Js / TS / Vue / React / 微信小程序 / uni-app / Taro 的【大转盘 & 九宫格 & 老虎机】抽奖插件，🎨奖品 / 文字 / 图片 / 颜色 / 按钮均可配置，支持同步 / 异步抽奖，🏅概率前 / 后端可控，可根据 dpr 自动调整清晰度适配移动端')

```bash
pnpm i @lucky-canvas/vue@latest
```

在 main 中引入：

```js
import VueLuckyCanvas from '@lucky-canvas/vue'
...
app.use(VueLuckyCanvas)
```



































