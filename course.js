$(document).ready(function () {
    // Function to fetch course data and update the HTML dynamically
    function fetchCourses() {
        $.ajax({
            url: 'http://localhost:3000/courses',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Clear the existing content inside the container
                $('#courses-container').empty();

                data.forEach(course => {
                    // Create a new course element for each course
                    const courseElement = $('<div class="col-md-3 p-0 m-4 courses" style="min-height:300px;height:300px;width: 28.33%;cursor: pointer;"></div>');
                    // Create a new course date element
                    const courseDateElement = $('<span class="course-date"></span>');

                    // Set the content of the course date element
                    const courseDate = new Date(course.Date);
                    const formattedDate = courseDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });
                    courseDateElement.text('Course Date: ' + formattedDate);

                    // Set the content of the course element with data from the current course
                    const courseImageElement = $('<img src="data:image/png;base64,' + course.Image + '" alt="Course Image">'); // class="course-image"
                    const courseTitleElement = $('<h6 class="course-title">' + course.title + '</h6>');
                    const courseReviewsElement = $('<div class="star"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><span>(' + course.reviews + ')</span></div>');
                    const courseCostElement = $('<div class="cost">' + course.Cost + '</div>');

                    // Append all elements to the course element
                    courseElement.append('<div class="row p-0 m-0" style="height:70%"><img class="p-0 h-105" src="data:image/png;base64,' + course.Image + '" alt="Course Image"></div>');
                    courseElement.append(`
                        <div class="row p-0 m-0" style="height:30%">
                            <div class="col-md-9 p-1 m-0" style="height:100%">
                                <div class="row p-0 m-0" style="height:30px">
                                    <span class="p-1 course-date">Course Date: ${formattedDate}</span>
                                </div>
                                <div class="row p-0 m-0" style="height:30px">
                                    <h6 class="p-1 course-title">${course.Name}</h6>
                                </div>
                                <div class="row p-0 m-0" style="height:30px">
                                <div class="p-1 star">
                                <i class="fas fa-star" style="color: ${course.Stars >= 1 ? 'green' : 'gray'};margin-bottom: 5px;"></i>
                                <i class="fas fa-star" style="color: ${course.Stars >= 2 ? 'green' : 'gray'};margin-bottom: 5px;"></i>
                                <i class="fas fa-star" style="color: ${course.Stars >= 3 ? 'green' : 'gray'};margin-bottom: 5px;"></i>
                                <i class="fas fa-star" style="color: ${course.Stars >= 4 ? 'green' : 'gray'};margin-bottom: 5px;"></i>
                                <i class="fas fa-star" style="color: ${course.Stars >= 5 ? 'green' : 'gray'};margin-bottom: 5px;"></i>
                                <span>(${course.Stars})</span>
                            </div>
                                </div>
                            </div>
                            <div class="col-md-3 text-right" style="height:100%;">
                                <div class="cost mt-3 ml-4 mr-0">${course.Cost}</div>
                            </div>
                        </div>
                    `);
                    // Add a click event handler to the course element
                    courseElement.on('click', function () {
                        // Define the course ID or other relevant information to pass to the course-inner page
                        const courseId = course.CourseID; // Modify this based on your data structure
                        const url = `course-inner.html?courseId=${courseId}`;
                        window.location.href = url;

                    });
                    // Append the populated course element to the container
                    $('#courses-container').append(courseElement);
                    courseElement.hover(
                        function () {
                            // Mouse over effect (e.g., change the background color)
                            $(this).css('background-color', 'lightgray');
                        },
                        function () {
                            // Mouse out effect (e.g., revert to the original background color)
                            $(this).css('background-color', ''); // Revert to the original background color

                        }
                    );

                });
            },
            error: function (error) {
                console.error('Error fetching course data:', error);
            }
        });
    }

    // Call the fetchCourses function when the page loads
    fetchCourses();
});
