$(document).ready(function () {

  GetCategories();

  function GetCategories()
  {
      $.ajax({
        type: "GET",
        url: "https://localhost:7259/api/Categories/Get",
        dataType: "JSON",
        error: function (error) {
          console.log("Something went wrong: " + error);
        },
        success: function (data) {
          console.log("Success!!");
          data.forEach(function (item) {
            $("#Categories").append( // Creating a new category
                '<div class="categoryList" catid="' + item.id + '"><h3>' + item.name + '</h3>' +
                '<button class="openButton">+</button>' + // Adding button which opens the category
                '<button class="closeButton">-</button>' + // Closing the category
                '<button class="removeButton">-</button>' + // Adding removebutton that shows when you want to remove category
                '<button class="editButton"><i class="fa-regular fa-pen-to-square"></i></button>' + // Adding editbutton that shows when you want to edit category names
                '<div class="addItem"><input class="input" type="text" placeholder="Legg til vare"></div>' + // Input field to add groceries
                '<div class="list" data-catid="' + item.id + '"></div>' + // Field where groceries are beeing placed. Given the same ID as the category it was created inside.
                '</div>',
                
            );
          });
      
         

          
        // Color effects when hovering over spesific buttons
        $(".categoryEdit, .categoryAdd, .categoryRemove").mouseover(function () {
          $(this).css("background-color", "lightgreen");
        });
        
        $(".categoryEdit, .categoryAdd, .categoryRemove").mouseleave(function () {
          $(this).css("background-color", "rgba(246, 245, 245, 0.699)");
        });

        $(".openButton, .closeButton").mouseover(function () {
          $(this).css("background-color", "rgb(248, 248, 248)");
        })

        $(".openButton, .closeButton").mouseleave(function () {
          $(this).css("background-color", "");
        })

        // Functionalities of the openButton
        $(".openButton").click(function () {
          $(this).css("visibility", "hidden");
          $(this).closest(".categoryList").find(".closeButton").css("visibility", "visible");
          $(this).closest(".categoryList").find(".addItem").css("visibility", "visible");
          $(".categoryList").click(function () {
            $(this).stop().animate({
                height: 200,
            },
            "fast");  
        })

    let currentCategoryId = $(this).closest(".categoryList").attr("catid"); // Get the currentCategoryId from the clicked category

    GetProducts(currentCategoryId); // Call GetProducts with the currentCategoryId to fetch and display groceries
          });

        // Functionalities of the closeButton
        $(".closeButton").click(function () {
          $(this).css("visibility", "hidden");
          $(this).closest(".categoryList").find(".openButton").css("visibility", "visible");
          $(this).closest(".categoryList").find(".addItem").css("visibility", "hidden");
          $(".categoryList").click(function () {
            $(this).stop().animate(
              {
                height: 59.5,
              },
              "fast");
            });  
        });

  // Adding groceries to the category
  $(".input").keypress(function (keyPressEvent) {
    let key = keyPressEvent.which; // gets the value of the pressed keyboard key
    if (key == 13) {
        // 13 = Enter
        let add = $(this).closest(".categoryList").find(".input").val().trim(); // the variable holds the input value
        if (add == "") {
            return; // if value is nothing, return nothing
        } else {
            let productName = add;
            let categoryId = $(this).closest(".categoryList").attr("catid");

            let data = {
                Name: productName,
                Category_Id: categoryId
            };

            $.ajax({
                type: 'POST',
                url: 'https://localhost:7259/api/Products/Post',
                data: JSON.stringify(data),
                contentType: 'application/json',
                success: function (response) {
                    console.log('Product created successfully:', response);
                    // Now, append the grocery item to the correct category list:
                    $(`[catid="${categoryId}"] .list`).append(
                        "<button class='addedItem'>" + productName + "</button>"
                    );

                    // Clear the input field after adding the grocery
                    $(".input").val("");
                },
                error: function (error) {
                    console.error('Error creating product:', error);
                    // Handle the error response here (e.g., display an error message)
                }
            });
        }
    };
    });

// Functionalities to grocery items
// Use event delegation for click and dblclick events on grocery items
$('.list').on('click', '.addedItem', function () {
  $(this).css("background-color", "lightgreen");
});

$('.list').on('dblclick', '.addedItem', function () {
  let ProductID = $(this).attr("groid");
  console.log(ProductID);
  let $itemToRemove = $(this); // Store the reference to the clicked element

  // Perform the DELETE request
  $.ajax({
    type: "DELETE",
    url: "https://localhost:7259/api/Products/Delete?id=" + ProductID,
    error: function (xhr, status, error) {
      // Handle the error response here (e.g., display an error message)
      console.log(error);
    },
    success: function (data) {
      console.log(data + ' Deleted');
      // Remove the deleted grocery item from the list
      $itemToRemove.remove(); // Use the stored reference to remove the element


    }
  });
});


    }, // End of Success
    }); // End of Ajax
  }
});




function GetProducts(currentCategoryId) {
  $.ajax({
      type: "GET",
      url: "https://localhost:7259/api/Products/GetProductsByCategory/" + currentCategoryId,
      dataType: "JSON",
      error: function (error) {
          console.log("Something went wrong: " + error);
      },
      success: function (data) {
          console.log("Success!!!");
          $(".list[data-catid='" + currentCategoryId + "']").empty(); // Clear only the list for the current category
          data.forEach(function (item) {
              $(".list[data-catid='" + currentCategoryId + "']").append(
                  "<button class='addedItem' groid='" + item.id + "'>" + item.name + "</button>"
              ); // Every grocery gets the addedItem class name
          });
          console.log('test');
      }
  });
}





// Editing category names
let edit = false;

$(".categoryEdit").click(function () {

    if (edit) { // Here, edit is true / "endre kategorinavnt" not clicked
      $(this).text("Endre kategorinavn").css("border-width", "1px");
      $(".closeButton").css("visibility", "hidden");
      $(".openButton").css("visibility", "visible");
      $(".editButton").css("visibility", "hidden");
      $(".categoryAdd").prop("disabled", false);

    // If there is no categories left, keep "fjern kategori" disabled
    let allCategories = document.querySelectorAll(".closeButton");
    let count = allCategories.length;
    console.log(count);

    if(count == 0) {
      $(".categoryRemove").prop("disabled", true);
      $(".categoryEdit, .categoryAdd").prop("disabled", false);
      $(".categoryRemove").text("Fjern kategori");
      $(".categoryRemove").text("Fjern kategori").css("border-width", "1px");
  } else { // If categories do exist, enable the button
    $(".categoryRemove").prop("disabled", false);
  };

      edit = false;
    } 
  
    else { // Here, remove is false / "endre kategorinavn" click and remove function active
      $(this).text("Avslutt").css("border-width", "3px");
      $(".openButton").css("visibility", "hidden");
      $(".closeButton").css("visibility", "hidden");
      $(".editButton").css("visibility", "visible"); // Hide open/closeButton and show editButton when wanting to remove categories
      $(".categoryRemove, .categoryAdd").prop("disabled", true); // Disabling other buttons when categoryEdit is active
  
      edit = true;
    }
  
     // Close all categories before editing any of them
     $(".categoryList").animate(
      {
        height: 59.5,
      },
      "fast");
  
      // Close all input fields before editing any of the category names
    $(".addItem").css("visibility", "hidden");

    // Sweet alert when selecting category name to edit
    $(".editButton").click(function () {
      editCategory($(this)); // Calling the function below, enables to edit category names individually
    });
  
    function editCategory () {
      Swal.fire({
        title: 'Skriv nytt kategorinavn',
        input: 'text',
        showCancelButton: true,
        cancelButtonText: 'Lukk',
        confirmButtonText: 'Opprett'      
      });
    };

    
  });


// Sweet alert when adding new cateogry
$(".categoryAdd").click(function () {
  Swal.fire({
      title: 'Legg til kategori',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Lukk',
      confirmButtonText: 'Opprett',
      preConfirm: function (categoryName) {
          // You can perform additional actions here before sending the AJAX request
          // For example, data validation or pre-processing the data
          if (categoryName.trim() === '') {
              Swal.showValidationMessage('Kategori navn er påkrevd!');
          } else {
              // Send the AJAX request using jQuery AJAX
              let newCategory = {Name: categoryName, Description: ""};
              let data = JSON.stringify(newCategory);
              $.ajax({
                type: "POST",
                url: "https://localhost:7259/api/Categories/CreateEdit",
                data: data,
                contentType:"application/json; charset=utf-8",
                dataType: "JSON",
                error: function () {
                  Swal.fire({
                    icon: 'error',
                    title: 'Feil!',
                    text: 'Det oppstod en feil under opprettelse av kategorien.',
                    confirmButtonText: 'OK'
                });
                },
                success: function (data) {
                  location.reload();
                } 
              });
          }
      }
  });
});


// Removing categories:
let remove = false; // Toggle variable from false to true, to execute different functionalities

$(".categoryRemove").click(function () {

  if (remove) { // Here, remove is true / "fjern kategori" not clicked
    $(this).text("Fjern kategori").css("border-width", "1px");
    $(".categoryEdit, .categoryAdd").prop("disabled", false);
    $(".closeButton").css("visibility", "hidden");
    $(".openButton").css("visibility", "visible");
    
    remove = false;
  } 

  else { // Here, remove is false / "fjern kategori" click and remove function active
    $(this).text("Avslutt").css("border-width", "3px");
    $(".openButton").css("visibility", "hidden");
    $(".closeButton").css("visibility", "hidden");
    $(".removeButton").css("visibility", "visible"); // Hide open/closeButton and show removeButton when wanting to remove categories
    $(".categoryEdit, .categoryAdd").prop("disabled", true); // Disabling other buttons when categoryRemove is active

    remove = true;
  }

   // Close all categories before removing any of them
   $(".categoryList").animate(
    {
      height: 59.5,
    },
    "fast");

    // Close all input fields before removing any of the categories
  $(".addItem").css("visibility", "hidden");


  // functionalities of removeButton
  $(".removeButton").click(function () {

    let catID = $(this).parent().attr("catid");
    console.log(catID)
    $.ajax({
      type: "DELETE",
      url: `https://localhost:7259/api/Categories/Delete/${catID}`,
      error: function (xhr, status, error) {       // Handle the error response here (e.g., display an error message)
        console.log(error);
        console.log('Something went wrong..')
      },
      success: function (data) {
        console.log(data);
      }
    });

    $(this).closest(".categoryList").remove()

    // If no category exists, disable the removeButton and editButton
    let allCategories = document.querySelectorAll(".closeButton");
    let count = allCategories.length;

    if(count == 0) {
      $(".categoryRemove, .categoryEdit").prop("disabled", true);
      $(".categoryAdd").prop("disabled", false);
      $(".categoryRemove").text("Fjern kategori");
      $(".categoryRemove").text("Fjern kategori").css("border-width", "1px");
  };
  });
  
});


    // Deletes all groceries at once
    $("#trashButton").click(function () {
     
        Swal.fire({
          text: 'Vil du fjerne alle varene?',
          showCancelButton: true,
          showConfirmButton: true,
          cancelButtonText: 'Avbryt',
          confirmButtonText: 'Fjern'
        } // Then, if user confirms, do this:
        ).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
                type: "DELETE",
                url: "https://localhost:7259/api/Products/DeleteAll",
                error: function (xhr, status, error) {
                    // Handle the error response here (e.g., display an error message)
                    console.log(error);
                },
                success: function (data) {
                    console.log("All groceries deleted");
                    // Remove all grocery items from the list
                    $(".addedItem").remove();
                }
            });
        
          } // If user doesnt confirm, do nothing: 
          else {
            return;
          }
        })
    });