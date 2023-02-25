# Test-Driven Development: Team Profile Generator

A Node.js CLI application that will take in information about employees on a software engineering team, then generates an HTML webpage that displays summaries for each person, following Agile methodology and TDD development process

## Table of contents

- [Test-Driven Development: Team Profile Generator](#test-driven-development-team-profile-generator)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Flowchart Diagram](#flowchart-diagram)
    - [Class Diagram](#class-diagram)
    - [Sequence Diagram](#sequence-diagram)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Describe the challenge here

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Flowchart Diagram

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

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- [Mermaid](https://mermaid.js.org/)

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

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author
  Your Name
- Website - [your name or website url](https://www.your-site.com)
- GitHub - [your GitHub username](https://github.com/yourusername)

**Note: Delete this note and add/remove/edit lines above based on what links you'd like to share.**

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**