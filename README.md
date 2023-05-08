# main/consolation-menu

This is a method of creating a terminal menu.
You can define a set of menus with default keys and either show the menu, or optionally pass in a key or abbr ro run that command.

### Functionality:
1. Will pick up a file with a list of commands and show a menu, with default keys attached
2. Will pick up a YAML and show a menu
3. Will allow us to pass in a key to run the command automatically
4. Will allow us to add commands with keys and optional descriptions



This will allow you to create an NPM script as follows:

```json
"scripts": {
  "compile": 'consolation-menu compile',
  "build": 'consolation-menu build',
}
```


## Getting Started

Download links:

HTTPS clone URL: https://github.com/andrew-oxenburgh/consolation-menu

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them.



# Examples

1. Picks up a text file of commands and shows the  

## Deployment

Add additional notes about how to deploy this on a production system.

## Resources

Add links to external resources for this project, such as CI server, bug tracker, etc.
