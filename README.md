# Relatively

Relatively is a simple interface web-app to help provide scale behind some of the numbers you see and hear about in the news.    

### Functionality and MVPs:
In Relatively, visitors will be able to:
   - Enter a figure they wish to compare relatively (initial design will accept only dollar amounts)
   - Choose from a provided list of relative items
       - This list will include familiar items such as a gallon of gas, a cheeseburger, average rent, etc
       - The intent is to allow easy comparison of the provided dollar amount to an easily understood reference object
    - View a zoomable chart depicting how many relative items their provided dollar amount could purchase.
    - Display the total number of relative items that could be purchased with their input
    - Display the total number of relative items currently displayed in the viewport

  
### Wireframe:
![Presentation1](https://user-images.githubusercontent.com/9735257/101295649-b937c880-37d3-11eb-94f2-f69cbd5f37f8.jpg)

### File Structure
- /dist
- /src
  - /assets^
    - hamburger.svg
    - house.svg
    - college.svg
    - car.svg
    - middle_school.svg
  - index.js
  - /scripts
    - app.js
    - util.js
  - styles
    - index.html
    - index.scss
- .gitignore
- node_modules
- package.json
- package.lock.json
- postcss.config.js
- README.md
- webpack.common.js
- webpack.dev.js
- webpack.prod.js

### Implementation Timeline
- 12/7: Html structure and basic d3.js setup
- 12/8: Dynamically populate the dom with test svg   
- 12/9: Add dropdown menu and associated calculations per menu item
- 12/10: Add zoom functionality
- 12/11: Styling touches and production README


^SVGS are from Font Awesome (https://fontawesome.com/license)
^Font is Montserrat: https://fonts.google.com/specimen/Montserrat