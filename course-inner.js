$(document).ready(function () {
    // Extract the course ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');

    // Check if a course ID is available in the URL
    if (courseId) {
        // Make an AJAX request to fetch course details based on the courseId
        $.ajax({
            url: `http://localhost:3000/courses-inner/${courseId}`,
            method: 'GET',
            dataType: 'json',
                success: function (courseData) {
                    // Populate the relevant elements on the 'course-inner.html' page with the course details
                    $('#course-title').text(courseData.Title);
                    $('#course-description').text(courseData.Description);
                    $('#cost').text(courseData.Price);
                    // Assuming that courseData.InstructorImage contains the base64 image data
                    //$('#tutor-image').attr('src', 'data:image/jpeg;base64,' + courseData.InstructorImage);
                    $('#course-img').attr('src', 'data:image/png;base64,' + courseData.InstructorImage);
                    $('#tutor-image').attr('src', 'data:image/png;base64,' + courseData.Imagetutor);
                    $('#instructor-name').text(courseData.InstructorName);
                    //console.log(courseData.InstructorImage);
                    $('#instructor-position').text(courseData.InstructorPosition);
                    $('#course-overview').text(courseData.Overview);
    
                    // Populate the "What you will learn" section
                    $('#learning1').text(courseData.learning1);
                    $('#learning2').text(courseData.learning2);
                    $('#learning3').text(courseData.learning3);
                    $('#learning4').text(courseData.learning4);
    
                    // Populate the "This Course Includes" section
                    $('#enroll1').text(courseData.enroll1);
                    $('#enroll2').text(courseData.enroll2);
                    $('#enroll3').text(courseData.enroll3);
                    $('#enroll4').text(courseData.enroll4);
                    $('#enroll5').text(courseData.enroll5);
                    $('#enroll6').text(courseData.enroll6);
                    $('#enroll7').text(courseData.enroll7);
                },
            error: function (error) {
                console.error('Error fetching course details:', error);
                // Handle the error as needed
            }
        });
    } else {
        // Handle the case where no course ID is provided in the URL
        console.error('Course ID not found in the URL');
        // You can display an error message or redirect the user as needed
    }
});

$('.enroll-btn a').on('click', function (event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId');
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
        // Ensure that the user is logged in before enrolling in a course
        alert('Please log in to enroll in the course.');
        return;
    }

    $.ajax({
        url:  `http://localhost:3000/enroll?courseId=${courseId}&userId=${userId}`,
        method: 'POST',
        success: function (response) {
            console.log(response);
            if (response === 'Already enrolled') {
                // Handle the case where the user is already enrolled
                toastr["info"]('User is already enrolled in this course.');
            } else {
                // Handle the success response (e.g., display a success message)
                toastr["success"]('Enrollment successful');
            }
        },
        error: function (error) {
            // Handle errors (e.g., display an error message)
            toastr["error"]('Error during enrollment');
        }
    });
});
const toastbox = document.getElementById('toastbox');
let alreadyEnrolled = '<i class="fas fa-times-circle">User is already enrolled in this course.';
let successfulEnrolment = 'Enrollment successful';
let errorDuringEnrollment = 'Error during enrollment';

// Function to show the snackbar
function showSnackbar(message) {
    let toast= document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML=message;
    toastbox.appendChild(toast);
    // snackbar.textContent = message;
    // snackbar.style.display = 'block';

    // Hide the snackbar after a few seconds (e.g., 3 seconds)
    setTimeout(function () {
        toastbox.remove();
        toastbox.style.display = 'none';
    }, 30000);
}

    // Set default Toastr options
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };