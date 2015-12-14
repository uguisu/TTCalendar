################################################
##  Library                                   ##
################################################
[MyBatis]
cglib-2.2.2.jar
log4j-api-2.0-rc1.jar
log4j-core-2.0-rc1.jar
mybatis-3.2.7.jar
slf4j-api-1.7.5.jar
slf4j-log4j12-1.7.5.jar

[MyBatis-spring]
mybatis-spring-1.2.2.jar

[Servlet]
servlet-api.jar

[JDBC]
mysql-connector-java-5.1.35-bin.jar

[Struts2]
asm-3.3.jar
asm-commons-3.3.jar
asm-tree-3.3.jar
commons-fileupload-1.3.1.jar
commons-io-2.2.jar
commons-lang3-3.1.jar
commons-logging-1.1.3.jar
freemarker-2.3.19.jar
javassist-3.17.1-GA.jar
log4j-1.2.17.jar
ognl-3.0.6.jar
struts2-core-2.3.16.1.jar
xwork-core-2.3.16.1.jar

[Spring]
spring-beans-4.0.6.RELEASE.jar
spring-context-4.0.6.RELEASE.jar
spring-core-4.0.6.RELEASE.jar
spring-expression-4.0.6.RELEASE.jar
spring-jdbc-4.0.6.RELEASE.jar
spring-web-4.0.6.RELEASE.jar

[YUI Compressor]
yuicompressor-2.4.8.jar

################################################
##  Tomcat                                    ##
################################################
    <!-- Xin.He Added -->
    <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
               maxThreads="150" scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS" 
               keystoreFile="/hexin/tomcat.keystore"
               keystorePass="hexin0614" />
               
<!-- Xin.He Added -->
<Context docBase="/home/hexin/workspace/TTCalendar/TTCalendar/WebContent" path="/TTCalendar" reloadable="true"/>

################################################
##  Refer links                               ##
################################################
[Closure Compiler]
https://developers.google.com/closure/compiler/index
https://github.com/google/closure-compiler
    ->  http://blog.csdn.net/tender001/article/details/7929449

[YUI Compressor]
http://yui.github.io/yuicompressor/
https://github.com/yui/yuicompressor/releases
    ->  https://gist.github.com/jasdeepkhalsa/4503658

[Servlet]
https://docs.oracle.com/javaee/6/api/javax/servlet/ServletRequest.html


[Image]
Thanks:  https://pixabay.com/zh/users/geralt-9301/