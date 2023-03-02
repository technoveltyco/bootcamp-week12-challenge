# Test-Driven Development: Team Profile Generator

A Node.js CLI application that will take in information about employees on a software engineering team, then generates an HTML webpage that displays summaries for each person, following Agile methodology and TDD development process

## Table of contents

- [Test-Driven Development: Team Profile Generator](#test-driven-development-team-profile-generator)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Walkthough \& Screenshots](#walkthough--screenshots)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [Flowchart Diagram (Simplified)](#flowchart-diagram-simplified)
    - [Class Diagram](#class-diagram)
    - [Sequence Diagram](#sequence-diagram)
    - [UX/UI Design](#uxui-design)
      - [Terminal Theming](#terminal-theming)
        - [Terminal Text Art Intro](#terminal-text-art-intro)
      - [Team Profile Page](#team-profile-page)
    - [Test Coverage](#test-coverage)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

In this Challenge, you'll create an application that generates HTML files using input from a command-line interface.

### The challenge

Your task is to take the given starter code and convert it into a working Node.js command-line application. This application will take in information about employees on a software engineering team, then generate an HTML webpage that displays summaries for each person. You have been provided with tests, so make sure every part of your code passes each provided test.

### Walkthough & Screenshots

![Walkthrough video of Team Profile Generator]()

_Click on each screenshot to take you to the Walkthrough video, a Team Profile's live example, and an example in PDF version._

[![The terminal intro screen of Team Profile Generator (not implemented yet)](./docs/assets/img/Terminal-Intro-Screenshot%202023-02-26%20211435.png)]()

[![Example of a generated Team Profile webpage on large screens](./docs/assets/img/Screenshot%202023-03-02%20at%2011-24-22%20My%20Team.png)](https://technoveltyco.github.io/bootcamp-week12-challenge/)

[![Example of a generated Team Profile webpage on small screens](./docs/assets/img/Screenshot%202023-03-02%20113146.png)

[![Example of a printer-friendly version of the Team Profile webpage](./docs/assets/img/Screenshot%202023-03-02%20112554.png)](https://technoveltyco.github.io/bootcamp-week12-challenge/output/My%20Team.pdf)

### Links

- Solution URL: [https://github.com/technoveltyco/bootcamp-week12-challenge](https://github.com/technoveltyco/bootcamp-week12-challenge)
- Live Site URL: [https://technoveltyco.github.io/bootcamp-week12-challenge/](https://technoveltyco.github.io/bootcamp-week12-challenge/)
- KANBAN Dashboard: [https://github.com/users/technoveltyco/projects/6](https://github.com/users/technoveltyco/projects/6)

## My process

I started designing the structure of the program by creating a [Flowchart Diagram](#flowchart-diagram-simplified), [Class Diagram](#class-diagram) and [Sequence Diagram](#sequence-diagram) to have a clearer idea of logic structure, modules and reference for automated tests coverage. FInally, I went through ideas and investigation to the [UX/UI Design](#uxui-design) starting from the terminal theming, and following with the webpage design for visualisation in screens and printer-friendly version.

### Built with

- Semantic HTML5 markup
- [CSS custom properties](https://github.com/technoveltyco/bootcamp-week12-challenge/blob/main/assets/css/style.css)
- Flexbox
- CSS Grid
- [Mobile-first workflow](https://github.com/technoveltyco/bootcamp-week12-challenge/blob/main/assets/css/style.css#L36)
- [Boostrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [Node.js](https://nodejs.org/en/)
  - [Archiver](https://www.npmjs.com/package/archiver)
  - [Chalk](https://www.npmjs.com/package/chalk)
  - [Inquirer](https://www.npmjs.com/package/inquirer)
  - [Jest.js](https://jestjs.io/)
- [Mermaid](https://mermaid.js.org/)

### Flowchart Diagram (Simplified)

```mermaid
---
title: Team Profile Generator
---
flowchart TB
    A((start)) --> B[Create new Team]
    B --> C[/Prompt Team Manager/]
    C --> D{Input data \nvalidates?}
    D -->|No| C[/Prompt Team Manager/]
    D -->|Yes| E[Add new Employee to Team]
    E --> F[/Prompt Main Menu/]
    F --> G{Add an Engineer?} & H{Add an Intern?} & I{Finish the Team?}
    G -->|No| F
    G -->|Yes| J[/Prompt Engineer/]
    J --> D
    H -->|No| F
    H -->|Yes| K[/Prompt Intern/]
    K --> D
    I -->|No| F
    I -->|Yes| L[Create HTML]
    L --> M((Finish))
```

### Class Diagram

```mermaid
---
title: Team Profile Generator
---
classDiagram
    AppSingleton <.. ClientConsole
    AppSingleton "1" <-- "1" EmployeeFactory : contains
    AppSingleton "1" <-- "1" TeamComposite : contains
    Team <|-- TeamComposite
    Team "0..*" <--* "1" TeamComposite
    Employee <|-- Team
    Employee "0..*" <--* "1" Team
    Employee <|-- Manager
    Employee <|-- Engineer
    Employee <|-- Intern

    class AppSingleton {
        -TeamComposite teamsInstance
        -AppSIngleton():void
        +getInstance()$:AppSingleton

    }
    class EmployeeFactory {
        +createEmployee(String type, Object params)*:Employee
    }
    class TeamComposite {
        -EmployeeFactory factory
        -List~Team~ teams
        +getTeams():List~Team~
        +getTeam(Integer index):Team
        +addTeam(Team team):void
        +removeTeam():Team
        +clearTeams():void
    }
    class Team {
        -List~Employee~ employees
        +getEmployees():List~Employee~
        +getEmployee(Integer id):Employee
        +addEmployee(Employee employee):void
        +removeEmployee(Integer id):Employee
        +clearEmployees():void
    }
    class Employee {
        <<abstract>>
        -String name
        -Integer id
        -String email
        +createEmployee(Object params):Employee
        +getName():String
        +getId():Integer
        +getEmail():String
        +getRole()*:String
    }
    class Manager {
        -Integer officeNumber
        +createEmployee(Object params):Employee
        +getOfficeNumber:Integer
        +getRole():String ~~override~~
    }
    class Engineer {
        -String github
        +createEmployee(Object params):Employee
        +getGithub():String
        +getRole():String ~~override~~
    }
    class Intern {
        -String school
        +createEmployee(Object params):Employee
        +getSchool():String
        +getRole():String ~~override~~
    }
```

I extended the original models to include a more scalable architecture using the following [design patterns](https://en.wikipedia.org/wiki/Design_Patterns):

- [Singleton](https://en.wikipedia.org/wiki/Singleton_pattern): the App class implements this pattern to restrict the creation of more than one instance in our application. This is the main entry point in the application flow, and handles more of the errors and recovery states of the program flow.
- **Factory:** _due to JavaScript limitations for creating abstract classes and interfaces, the implementation of classical OO factory patterns are usually achieved by using [functional patterns](https://www.javascripttutorial.net/javascript-factory-functions/)_. However, a mixed implementation between the [Abstract factory pattern](https://en.wikipedia.org/wiki/Abstract_factory_pattern) and [Factory method pattern](https://en.wikipedia.org/wiki/Factory_method_pattern) was used to achieve flexibility in the design and allow the creation of model classes using 3 different approaches:

```js
  ///
  // Examples of different ways to initialise employees/manager/engineer/intern.
  // ------------------------------------------------------------------------------
  // - With constructor:
  // const employee = new Employee(...data);
  // - With factory method:
  // const employee = Employee.createEmployee(...data);
  // - With factory abstract class method: (the one used here)
  // const employee = EmployeeFactory.createEmployee("manager", ...data);
```

- [Composite](https://en.wikipedia.org/wiki/Composite_pattern): used for the container classes that store multiple instances of the model object, and allowing to create and control higher level data structures like: **team of employees**, and **list of teams**. By adding these structures, it also required to extend the test suite to check the correct integration of the data structures and ensure that the desired access restrictions to the data would be accomplished.

### Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    activate User
    User->>App:Start
    activate App
    App->>Inquirer:prompt Team Manager
    activate Inquirer
    loop Name, ID, email, office
        Inquirer-->>User:request manager data
        User->>Inquirer:input
        Inquirer->>Inquirer:Validate input
        Inquirer-->>User:output result
    end
    Inquirer-->>App:Name, ID, email, office
    deactivate Inquirer
    App->>Team:create
    activate Team
    Team-->>App:<<Team>>
    App->>Manager:Name,ID,email,office
    activate Manager
    Manager-->>App:<<Manager>>
    deactivate Manager
    App->>Team:add <<Employee>>
    deactivate Team
    App->>Inquirer:prompt Main Menu
    activate Inquirer
    loop is not stop prompt
        Inquirer-->>User:request employee data
        User->>Inquirer:chosen option
        alt option is Add an engineer
            loop name,ID,email,github
                Inquirer-->>User:request employee data
                User->>Inquirer:input
                Inquirer->>Inquirer:Validate input
                Inquirer-->>User:output result
                Inquirer-->>App:Name,ID,email,github
                App->>Engineer:Name,ID,email,github
                activate Engineer
                Engineer-->App:<<Engineer>>
                deactivate Engineer
            end
            App->>Inquirer:prompt Main Menu
        else alt option is Add an Intern
            loop name,ID,email,school
                Inquirer-->>User:request employee data
                User->>Inquirer:input
                Inquirer->>Inquirer:Validate input
                Inquirer-->>User:output result
                Inquirer-->>App:Name,ID,email,school
                App->>Intern:Name,ID,email,school
                activate Intern
                Intern-->>App:<<Intern>>
                deactivate Intern
            end
            App->>Team:add employee <<Intern>>
            App->>Inquirer:prompt Main Menu
        else option is Finish building the team
            Inquirer-->>App: stop prompt
            deactivate Inquirer
        end
    end
    App->>HTML Generator:generate
    HTML Generator-->>App:<<DOM>>
    App-->>User:<<HTML>>
    deactivate App
    deactivate User
```

### UX/UI Design

A definition of colors and output message formatting were created in an specific CLI module with different utilities and helper functions.

#### Terminal Theming

##### Terminal Text Art Intro

_This cover intro was created but still not implemented in v1.0._

```text
 ███████████                                       ███████████                        ██████   ███  ████                █████████                                                    █████                      
░█░░░███░░░█                                      ░░███░░░░░███                      ███░░███ ░░░  ░░███               ███░░░░░███                                                  ░░███                       
░   ░███  ░   ██████   ██████   █████████████      ░███    ░███ ████████   ██████   ░███ ░░░  ████  ░███   ██████     ███     ░░░   ██████  ████████    ██████  ████████   ██████   ███████    ██████  ████████ 
    ░███     ███░░███ ░░░░░███ ░░███░░███░░███     ░██████████ ░░███░░███ ███░░███ ███████   ░░███  ░███  ███░░███   ░███          ███░░███░░███░░███  ███░░███░░███░░███ ░░░░░███ ░░░███░    ███░░███░░███░░███
    ░███    ░███████   ███████  ░███ ░███ ░███     ░███░░░░░░   ░███ ░░░ ░███ ░███░░░███░     ░███  ░███ ░███████    ░███    █████░███████  ░███ ░███ ░███████  ░███ ░░░   ███████   ░███    ░███ ░███ ░███ ░░░ 
    ░███    ░███░░░   ███░░███  ░███ ░███ ░███     ░███         ░███     ░███ ░███  ░███      ░███  ░███ ░███░░░     ░░███  ░░███ ░███░░░   ░███ ░███ ░███░░░   ░███      ███░░███   ░███ ███░███ ░███ ░███     
    █████   ░░██████ ░░████████ █████░███ █████    █████        █████    ░░██████   █████     █████ █████░░██████     ░░█████████ ░░██████  ████ █████░░██████  █████    ░░████████  ░░█████ ░░██████  █████    
   ░░░░░     ░░░░░░   ░░░░░░░░ ░░░░░ ░░░ ░░░░░    ░░░░░        ░░░░░      ░░░░░░   ░░░░░     ░░░░░ ░░░░░  ░░░░░░       ░░░░░░░░░   ░░░░░░  ░░░░ ░░░░░  ░░░░░░  ░░░░░      ░░░░░░░░    ░░░░░   ░░░░░░  ░░░░░     
                                                                                                                                                                                                                
                                                                                                                                                                                                                
                                                                                                                                                                                                                
              ,  ,                                                           █████                
             / \/ \,'| _                                                    ░░███                
            ,'    '  ,' |,|                                                  ░███████  █████ ████
           ,'           ' |,'|                                               ░███░░███░░███ ░███ 
          ,'                 ;'| _                                           ░███ ░███ ░███ ░███ 
         ,'                    '' |                                          ░███ ░███ ░███ ░███ 
        ,'                        ;-,                                        ████████  ░░███████ 
       (___                        /                                        ░░░░░░░░    ░░░░░███ 
     ,'    `.  ___               ,'                                                     ███ ░███ 
    :       ,`'   `-.           /                                                      ░░██████  
    |-._ o /         \         /                                                        ░░░░░░   
   (    `-(           )       /
  ,'`.     \      o  /      ,'
 /    `     `.     ,'      /
(             `"""'       /              ███████████                   █████                                               ████   █████               
 `._                     /              ░█░░░███░░░█                  ░░███                                               ░░███  ░░███                
    `--.______        '"`.              ░   ░███  ░   ██████   ██████  ░███████   ████████    ██████  █████ █████  ██████  ░███  ███████   █████ ████ 
       \__,__,`---._   '`;                  ░███     ███░░███ ███░░███ ░███░░███ ░░███░░███  ███░░███░░███ ░░███  ███░░███ ░███ ░░░███░   ░░███ ░███  
            ))`-^--')`,-'                   ░███    ░███████ ░███ ░░░  ░███ ░███  ░███ ░███ ░███ ░███ ░███  ░███ ░███████  ░███   ░███     ░███ ░███  
          ,',_____,'  |                     ░███    ░███░░░  ░███  ███ ░███ ░███  ░███ ░███ ░███ ░███ ░░███ ███  ░███░░░   ░███   ░███ ███ ░███ ░███  
          \_          `).                   █████   ░░██████ ░░██████  ████ █████ ████ █████░░██████   ░░█████   ░░██████  █████  ░░█████  ░░███████  
            `.      _,'  `                 ░░░░░     ░░░░░░   ░░░░░░  ░░░░ ░░░░░ ░░░░ ░░░░░  ░░░░░░     ░░░░░     ░░░░░░  ░░░░░    ░░░░░    ░░░░░███  
            /`-._,-'      \                                                                                                                 ███ ░███                                                                                                                                                                                                                 
                                                                                                                                            ░░██████                                                                                                                                                                                         
                                                                                                                                             ░░░░░░                                                                                                                                                                             

```

#### Team Profile Page

### Test Coverage

### What I learned

Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge.

To see how you can add code snippets, see below:

```html
<h1>Some HTML code I'm proud of</h1>
```

```css
.proud-of-this-css {
  color: papayawhip;
}
```

```js
const proudOfThisFunc = () => {
  console.log("🎉");
};
```

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

## Author

  Daniel Rodriguez

- Website - [Technovelty.co](https://technovelty.co/)
- GitHub - [Technovelty](https://github.com/technoveltyco)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.
