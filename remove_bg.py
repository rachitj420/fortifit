from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()
    new_data = []
    for item in datas:
        if item[0] > 230 and item[1] > 230 and item[2] > 230:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_background(
        "/Users/rachitjain/Desktop/FORTIFIT WEBSITE/assets/logo2.png",
        "/Users/rachitjain/Desktop/FORTIFIT WEBSITE/assets/logo-transparent.png"
    )
