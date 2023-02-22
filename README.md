# KanBan-App-API

This repo contains the api collection for the popular Kanban task app. 

## Requirements
1. User should be able to register
2. User should be able to login with Passport using JWT
3. User should be able to logout
3. Implement basic auth
4. User should be able to create board
5. Users should be able to get all boards
6. Users should be able to get each board 
7. Users should be able to update and delete boards
8. User should be able to add a task to a board
9. Users should be able to get all tasks for a board
10. Users should be able to get each task for a board
11. Users should be able to update and delete tasks
12. Users should be able to add subtasks to a given task
13. Users should be able to mark a subtask as completed or uncompleted
14. Users should be able to edit or remove a subtasks
15. Users should be able to collaborate with a registered user on a board
16. Collaborated users on a board should be able to get the collaborated board, update the board but can't delete a board.
17. Only the creator of a board should be able to delete the board

## Setup
Install NodeJS, mongodb
pull this repo
Open the folder on your local computer
At the terminal, run `npm install` to install all packages
run `npm run start:dev` or `nodemon` to start the server

## Base URL
[https://kanban-task-api.cyclic.app/](https://kanban-task-api.cyclic.app/)

# Models
### User
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| Email  | String  | unique, required |
| id | String | required |
| fullname | String | required |
| Password | String | required |
| timestamps | String | required |


### Board
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| id | String | required |
| name | String | required |
| collaborators | String | required |
| userId | String | required |

### Task
| Field  | Data type | constraint
| ------------- | ------------- |------------- |
| id | String | required |
| title | String | required |
| description | String | required |
| status | String | optional |
| boardId | String | required |

## API Routes
All routes and API details can be found at the documentation [here](https://documenter.getpostman.com/view/19697282/2s93CKRFNz)
