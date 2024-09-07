import cv2
import socketio
import time
import numpy as np
import requests

sio = socketio.Client()
sio.connect('http://localhost:3001')

camera_id = "camera1"  # Example camera ID

# Fetch the camera details from the backend
response = requests.get(f'http://localhost:3001/api/cameras/{camera_id}')
camera_info = response.json()

cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open camera.")
    exit()

# Initialize variables for movement detection
prev_frame = None
movement_threshold = 30  # Sensitivity of movement detection

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to grab frame")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (21, 21), 0)  # Blur the frame for better difference detection

    if prev_frame is None:
        prev_frame = blurred
        continue

    # Compute the absolute difference between the current frame and the previous frame
    frame_diff = cv2.absdiff(prev_frame, blurred)
    diff_mean = np.mean(frame_diff)

    if diff_mean > movement_threshold:
        # Detected significant movement
        print("Movement detected")

        # Emit data indicating camera movement
        fall_data = {
            "location": camera_info["floor"],  # Use the floor from the camera info
            "x": camera_info["x"],  # Use the x-coordinate from the camera info
            "y": camera_info["y"]   # Use the y-coordinate from the camera info
        }
        sio.emit('fallDetected', fall_data)

        # Update the previous frame for the next iteration
        prev_frame = blurred

    # Display the video feed
    cv2.imshow('Movement Detection', frame)

    # Exit if 'q' is pressed
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
