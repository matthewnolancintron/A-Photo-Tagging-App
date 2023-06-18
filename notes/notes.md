## main funcitonality
- choose photo identify where each
  items to be found is and save it to
  the database 

- when the user clicks the photo a 
  context menu is shown with a list of
  options to select from.

- when the user clicks on the image
  and selects their choice from the 
  context menu there should be a condition that checks if the item
  the clicked on is equal to the choice
  they selected
  provide feedback if wrong a message
  if correct place a marker on the photo
  in the items location in both cases
  remove the context menu until the
  user clicks again

## about keeping score:    
Keep track of how long it takes between when the photo is first loaded and when the user finally identifies all characters

Firebase users don’t need to add a timer on the backend, instead add one on the front end. Once a round is complete, ask the user for his/her name and record that time. This will get a bit tricky since you’ll have anonymous users you need to keep track of!


# main elements of project.
1. Image and item data in Firestore: Storing the image and item data in Firestore allows you to easily retrieve and update the data from your application. You can structure the data in collections and documents, as discussed earlier.

2. Dynamic image and item data retrieval for a level system: By retrieving the image and item data dynamically from Firestore, you can implement a level system where each level corresponds to a different image and its associated items. As the user progresses through the levels, you can fetch the next image and item data from Firestore.

3. Handling hitbox coordinates dynamically based on image dimensions: To handle hitbox coordinates dynamically, you can calculate a scale factor based on the current image dimensions and the default dimensions. This scale factor can then be applied to adjust the hitbox coordinates when the image is resized or displayed on different devices.

4. ContextMenu component with item choices: The ContextMenu component can be updated to retrieve the item documents from Firestore and generate a list of item choices dynamically. Each choice can display the name of the item and its hitbox coordinates.

5. Game logic: Implement the game logic to check if the user's click coordinates match any of the item hitboxes or coordinate ranges. If there is a match, you can check if the selected choice matches the item clicked by the user. You can use conditional statements and comparisons to handle these checks and update the game state accordingly.

By combining these elements, you can create a responsive and interactive photo tagging game where users can click on items in the image, make choices from the context menu, and progress through different levels.

also keeping score and saving info for the user and 
once all items are found progress to the next level.

# think about display hud such as showing the amount of time in the botom of the screen or a progress bar.