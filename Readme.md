## Cost Explorer 
 

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#built-with">Built With</a></li>
    <li><a href="#installation">Installation</a></li>
    <li> 
        <a href="#documentation">Documentation</a>
        <ul><a href="#project-structure"> Project Structure </a></ul>
        <ul><a href="#layers"> Layers </a></ul>
        <ul><a href="#helper-libraries"> Helper Libraries </a></ul>
        <ul><a href="#caching"> Caching </a></ul>
        <ul><a href="#data-types-and-interfaces"> Data Types and Interfaces </a></ul>
    </li>
    <li><a href="#api-testing">API Testing</a></li>
  </ol>
</details>

<!-- GETTING STARTED -->
## Built With 

The project is build using NodeJS in Typescript. 
The web framework used is Express.
Data ORM used is Sequelize. 
1. Typescript is used because it is easier to understand as types are attached to each variable, also
helps catch most bugs at compiletime
2. Sequelize ORM is used because it has good support for features like eager loading, nested loading, 
establishing relations between data and relational models. 

## Prerequisites

This is an example of how to list things you need to use the software and how to install them.
1. NodeJs
2. PostgreSQL

## Installation
 
1. Clone the repo
   ```sh
   git clone https://github.com/Sudheer121/CostExplorer
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Setup data base from PostgreSQL dump
   ```sh
   psql -U user_name -d db_name -1 -f dump.sql
   ```
4. Fill .env parameters 
   ```
   cp .enc.example .env 
   ```

5. Run 
   ```
   npx tsc
   npm run start:dev 
   ```
   
## Documentation 

Below is the documentation 

### Project Structure 

Since the project is build with typescript source code is in `./src` and complied 
javascript is in `./dist` 

### Layers 

The project layers consist of Models, Controller, Services and DAO layer

### Helper Libraries

Custom created modules can be viewed at `./src/helpers`. These modules are unrelated to project data
but are useful in converting data from one form to other. 
These modules abstract away some of the logic. 

Example : The Graph library takes data and creates an object that has graph representation of input data 

### Caching 

Before the server starts, it caches the `CostTypes` table from database, it converts the data into graph form using `Graph` helper module. The cached data is stored in a static class `CacheSingleton` and is accessible throughout the project. 

### Data Types and Interfaces

Custom Data Types and Interfaces can be viewed at `./src/typings/index.d.ts`. 
This alse has the interfaces `CostExplorerOutput` and `ExplorerItem` as specified. 

Other than the provided interfaces the project uses commonly these interfaces. 

1. IGraphNode 
> Represents a graph node, should have `id` and `parent id`

2. IData
> Represents any data and should have `id` attribute

3. INest 
> Represents IData in nested form, `ExplorerItem` is a specific form of `INest` 

## API testing
```
Postman documentation will be added in sometime 
```