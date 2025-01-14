import qrcode

# 正確的網站 URL
url = "https://lovely-sorbet-5b414e.netlify.app/"

# 生成 QR 碼
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_L,
    box_size=10,
    border=4,
)
qr.add_data(url)  # 添加 URL 到 QR 碼
qr.make(fit=True)

# 創建圖片並保存
img = qr.make_image(fill='black', back_color='white')
img.save("bus_stop_qr.png")
