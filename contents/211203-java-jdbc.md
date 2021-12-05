---
date: "2021-12-03"
title: "[Java] JDBC"
category: "Language"
categoryColor: "darkorchid"
tags: ["Java", "JDBC", "SQL"]
thumbnail: "./images/Java.jpeg"
---

# JDBC (Java Database Connectivity)

<hr />

> JDBC는 DBMS connection/operation을 위한 Java 기반 API set이다.

다양한 DBMSs(Oracle, DB2, SQL Server, MySQL, PostgreSQL, JavaDB, Sqlite, SAP HANA...)에 접근할 수 있도록 설계되었다.

- 주요 이점: **단일(자바) 프로그램은 여러 데이터베이스에 연결하고 그 위에서 작업을 수행할 수 있다.**

- **DBMS에 독립적이지만 먼저 선택한 DBMS와 연결된 적절한 드라이버를 명시적으로 로드해야 한다.**

```java
try {
    // Load the Oracle DBMS Driver for JDBC with DriverManager
    Class.forName("oracle.jdbc.driver.OracleDriver") // Oracle
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}
```

<br />

## DB 연결을 위한 Java 개체 간의 관계 (in JDBC)

<div style="text-align: center">
  <img src="https://user-images.githubusercontent.com/33220404/144569106-72db7e58-4778-439e-803b-230187b423ac.png" width="900px">
</div>

<br />

## JDBC 관련 주요 Packages

<div style="text-align: center">
  <img src ="https://user-images.githubusercontent.com/33220404/144569735-4a21b73e-f686-4487-b0ba-6b608d3030e1.png" width="900px">
</div>

<br />

## Connection

```java
import java.sql.*;

public class TestJDBC {
    public static final String URL = "jdbc:oracle:thin:@localhost:1521:orcl";
    public static final String USER_UNIVERSITY = "university";
    public static final String USER_PASSWD = "comp322";

    public static void main(String[] args) {
        Connection conn = null;
        Statement stmt = null;
        String sql = "";
        try {
            // Load a JDBC driver for Oracle DBMS
            Class.forName("oracle.jdbc.driver.OracleDriver");
            // Get a Connection object
            System.out.println("Success!");
        } catch(ClassNotFoundException e) {
            System.err.println("error = " + e.getMessage());
            System.exit(1);
        }

        // Make a connection
        try {
            conn = DriverManager.getConnection(URL, USER_UNIVERSITY, USER_PASSWD);
            System.out.println("Connected.");
        } catch(SQLException ex) {
            ex.printStackTrace();
            System.err.println("Cannot get a connection: " + ex.getLocalizedMessage());
            System.err.println("Cannot get a connection: " + ex.getMessage());
            System.exit(1);
        }
    }
}
```

<br />

## CREATE TABLE

```java
try {
    conn.setAutoCommit(false);  // auto-commit disabled
    // Create a statement object
    stmt = conn.createStatement();
    sql = "DROP TABLE " + TABLE_NAME + " CASCADE CONSTRAINT";
    int res = stmt.executeUpdate(sql);
    if(res == 0)
      System.out.println("Table was successfully dropped.");
    StringBuffer sb = new StringBuffer();
    sb.append("CREATE TABLE " + TABLE_NAME + " (Id INT, ");
    sb.append("Name VARCHAR(10), ");
    sb.append("Address VARCHAR(20))");
    sql = sb.toString();
    // Try 'CREATE TABLE ...'
    res = stmt.executeUpdate(sql);
    if(res == 0)
      System.out.println("Table was successfully created.");
    conn.commit();
} catch(SQLException ex2) {
    System.err.println("sql error = " + ex2.getMessage());
    System.exit(1);
}
```

<br />

## INSERT

```java
try {
    sql = "INSERT INTO " + TABLE_NAME + " VALUES (10, 'SUH', 'Daegu')";
    // Try 'INSERT INTO ...' for the first time
    int res = stmt.executeUpdate(sql);
    System.out.println(res + " row inserted.");
    // Let's do more.
    sql = "INSERT INTO " + TABLE_NAME + " VALUES (20, 'PARK', 'Busan')";
    // Add above SQL statement in the batch.
    stmt.addBatch(sql);
    sql = "INSERT INTO " + TABLE_NAME + " VALUES (30, 'KIM', 'Seoul')";
    // Add above SQL statement in the batch.
    stmt.addBatch(sql);
    sql = "INSERT INTO " + TABLE_NAME + " VALUES (40, 'RYU', 'Jeju')";
    // Add above SQL statement in the batch.
    stmt.addBatch(sql);
    // Create an int[] to hold returned values
    int[] count = stmt.executeBatch();
    System.out.println(count.length + " row inserted.");
    conn.commit();
} catch(SQLException ex2) {
    System.err.println("sql error = " + ex2.getMessage());
    System.exit(1);
}
```

<br />

## Query

1.
```java
try {
    sql = "SELECT * FROM " + TABLE_NAME;
    ResultSet rs = stmt.executeQuery(sql);
    while(rs.next()) {
        int      id = rs.getInt(1);
        String name = rs.getString(2);
        String addr = rs.getString(3);
        System.out.println("ID = " + id
                        + ", Name = " + name
                        + ", Address = " + addr);
    }
    conn.commit();
} catch(SQLException ex2) {
    System.err.println("sql error = " + ex2.getMessage());
    System.exit(1);
}
```

<br />

2.
```java
try {
    sql = "SELECT * FROM " + TABLE_NAME + " WHERE Id = ?";
    PreparedStatement ps = conn.preparedStatement(sql);
    ps.setInd(1, 40);
    ResultSet rs = ps.executeQuery();
    while(rs.next()) {
        int      id = rs.getInt(1);
        String name = rs.getString(2);
        String addr = rs.getString(3);
        System.out.println("ID = " + id
                        + ", Name = " + name
                        + ", Address = " + addr);
    }
    ps.close();
    rs.close();
    conn.commit();
} catch(SQLException ex2) {
    System.err.println("sql error = " + ex2.getMessage());
    System.exit(1);
}
```

<br />

## UPDATE/DELETE

```java
try {
    sql = "UPDATE " + TABLE_NAME + " SET NAME = 'Oh' WHERE Id = 40";
    // Try 'UPDATE ...' for the first time
    int res = stmt.executeUpdate(sql);
    System.out.println(res + " row updated.");
    
    sql = "DELETE FROM " + TABLE_NAME + " WHERE Id = 30";
    // Add above SQL statement in the batch.
    stmt.addBatch(sql);
    int[] count = stmt.executeBatch();
    System.out.println(count.length + " row deleted.");
    conn.commit();
} catch(SQLException ex2) {
    System.err.println("sql error = " + ex2.getMessage());
    System.exit(1);
}
```