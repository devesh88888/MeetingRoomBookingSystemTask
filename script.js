document.addEventListener("DOMContentLoaded", function () {
  let rooms = JSON.parse(localStorage.getItem("rooms")) || [
    { name: "Room A", bookings: [] },
    { name: "Room B", bookings: [] },
    { name: "Room C", bookings: [] },
  ];

  const timeSlots = [
    "9:00-9:30",
    "9:30-10:00",
    "10:00-10:30",
    "10:30-11:00",
    "11:00-11:30",
    "11:30-12:00",
  ];

  const roomSelect = document.getElementById("room-select");
  const timeSlotSelect = document.getElementById("time-slot-select");
  const bookButton = document.getElementById("book-button");
  const bookingList = document.getElementById("booking-list");
  const roomList = document.getElementById("room-list");

  // Populate room and time slot selects
  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.name;
    option.textContent = room.name;
    roomSelect.appendChild(option);
  });
  // console.log(rooms);
  timeSlots.forEach((slot) => {
    const option = document.createElement("option");
    option.value = slot;
    option.textContent = slot;
    timeSlotSelect.appendChild(option);
  });

  // Function to save rooms data to local storage
  function saveRoomsToLocalStorage() {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }

  // Function to check if a room is available at a given time slot
  function isRoomAvailable(roomName, timeSlot) {
    const room = rooms.find((room) => room.name === roomName);
    if (room) {
      return !room.bookings.includes(timeSlot);
    }
    return false;
  }

  // Event listener for booking a room
  bookButton.addEventListener("click", () => {
    const selectedRoom = roomSelect.value;
    const selectedTimeSlot = timeSlotSelect.value;

    if (isRoomAvailable(selectedRoom, selectedTimeSlot)) {
      const room = rooms.find((room) => room.name === selectedRoom);
      if (room) {
        room.bookings.push(selectedTimeSlot);
        saveRoomsToLocalStorage();
        updateBookingList();
        updateRoomCounts();
      }
    } else {
      alert("This time slot is already booked for the selected room.");
    }
  });

  // Function to update the booking list
  function updateBookingList() {
    bookingList.innerHTML = "";
    rooms.forEach((room) => {
      room.bookings.forEach((booking) => {
        const li = document.createElement("li");
        li.textContent = `${room.name}: ${booking}`;
        const cancelBtn = document.createElement("button");
        cancelBtn.textContent = "Cancel";
        cancelBtn.className = "cancel-button";
        cancelBtn.addEventListener("click", () => {
          cancelBooking(room.name, booking);
        });
        li.appendChild(cancelBtn);
        bookingList.appendChild(li);
      });
    });
  }

  // Function to update room counts
  function updateRoomCounts() {
    roomList.innerHTML = "";
    rooms.forEach((room) => {
      const li = document.createElement("li");
      li.textContent = `${room.name}: ${room.bookings.length} bookings`;
      roomList.appendChild(li);
    });
  }

  // Function to cancel a booking
  function cancelBooking(roomName, timeSlot) {
    const room = rooms.find((room) => room.name === roomName);
    if (room) {
      const index = room.bookings.indexOf(timeSlot);
      if (index !== -1) {
        room.bookings.splice(index, 1);
        saveRoomsToLocalStorage();
        updateBookingList();
        updateRoomCounts();
      }
    }
  }

  // Initial update of booking list and room counts
  updateBookingList();
  updateRoomCounts();

  const footer = document.createElement("footer");
  footer.textContent = `© ${new Date().getFullYear()} Your Name`;
  document.body.appendChild(footer);
});
