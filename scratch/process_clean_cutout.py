import cv2
import numpy as np
from PIL import Image

src_path = "/Users/ommprakashmohanty/.gemini/antigravity-ide/brain/95f1fc74-247b-42bf-99df-f682096da18d/.user_uploaded/media_1788248336367.jpg"
img = cv2.imread(src_path)

# Convert to grayscale to find non-black pixels
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Threshold black background
_, thresh = cv2.threshold(gray, 8, 255, cv2.THRESH_BINARY)

# Find the largest contour (the person) and fill internal holes
contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
mask = np.zeros_like(gray)
if contours:
    largest_contour = max(contours, key=cv2.contourArea)
    cv2.drawContours(mask, [largest_contour], -1, 255, thickness=cv2.FILLED)

# Refine mask: smooth and feather slightly
mask_blurred = cv2.GaussianBlur(mask, (5, 5), 0)

# Merge RGBA
b, g, r = cv2.split(img)
rgba = [b, g, r, mask_blurred]
dst = cv2.merge(rgba, 4)

cv2.imwrite("public/suit-cutout-clean.png", dst)
cv2.imwrite("public/suit-cutout.png", dst)
print("SUCCESS: Generated public/suit-cutout-clean.png & public/suit-cutout.png successfully!")
