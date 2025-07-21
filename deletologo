from PIL import Image
import numpy as np
import matplotlib.pyplot as plt

# Load your image
img = Image.open("ansto_logo.png").convert("RGBA")

# Convert image to array
data = np.array(img)

# Identify white pixels (you can tweak the threshold)
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]
white_areas = (r > 240) & (g > 240) & (b > 240)

# Make white pixels transparent
data[white_areas, 3] = 0

# Convert back to image
transparent_img = Image.fromarray(data)

# Save the new image
transparent_img.save("ansto_logo_transparent.png")

# Optional: Preview
plt.imshow(transparent_img)
plt.axis('off')
plt.title("Transparent Logo")
plt.show()
