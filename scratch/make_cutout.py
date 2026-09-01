import cv2
import numpy as np
from PIL import Image

src_path = "/Users/ommprakashmohanty/.gemini/antigravity-ide/brain/95f1fc74-247b-42bf-99df-f682096da18d/.user_uploaded/media_1788247573601.jpg"
balcony_path = "/Users/ommprakashmohanty/.gemini/antigravity-ide/brain/95f1fc74-247b-42bf-99df-f682096da18d/.user_uploaded/media_1788247560160.jpg"

# 1. Copy balcony night photo to public/balcony-night.jpg
img_balcony = Image.open(balcony_path)
img_balcony.save("public/balcony-night.jpg", quality=95)
print("Saved public/balcony-night.jpg")

# Also copy suit portrait as unedited
img_suit = Image.open(src_path)
img_suit.save("public/suit-portrait.jpg", quality=95)
img_suit.save("public/ommprakash-hero-edit.jpg", quality=95)
print("Saved public/suit-portrait.jpg & public/ommprakash-hero-edit.jpg")

# 2. Process suit portrait with GrabCut + Edge refinement
img = cv2.imread(src_path)
height, width = img.shape[:2]

mask = np.zeros((height, width), np.uint8)
bgdModel = np.zeros((1, 65), np.float64)
fgdModel = np.zeros((1, 65), np.float64)

# Bounding box for subject (leave small margin around edges)
rect = (int(width * 0.05), int(height * 0.05), int(width * 0.90), int(height * 0.95))
cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 7, cv2.GC_INIT_WITH_RECT)

# Refine based on studio grey background characteristics
# In HSV/Lab, the background is very low saturation and grey
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
sat = hsv[:, :, 1]
val = hsv[:, :, 2]

# Outer border pixels are guaranteed background
mask[:int(height*0.08), :] = cv2.GC_BGD
mask[:, :int(width*0.08)] = cv2.GC_BGD
mask[:, int(width*0.92):] = cv2.GC_BGD

# Center area is guaranteed foreground (face, shirt, tie, suit)
mask[int(height*0.25):int(height*0.90), int(width*0.20):int(width*0.80)] = cv2.GC_FGD

cv2.grabCut(img, mask, None, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_MASK)

# Create binary mask (1 for foreground, 0 for background)
bin_mask = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')

# Feather edges softly with GaussianBlur for studio-grade cutout
blurred_mask = cv2.GaussianBlur(bin_mask, (9, 9), 0)

# Convert to BGRA
b, g, r = cv2.split(img)
rgba = [b, g, r, blurred_mask]
dst = cv2.merge(rgba, 4)

cv2.imwrite("public/suit-cutout.png", dst)
print("Saved public/suit-cutout.png successfully with shape:", dst.shape)
