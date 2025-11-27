from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

# Chrome seçenekleri
options = webdriver.ChromeOptions()
options.add_argument("--start-maximized")  # İsteğe bağlı: tam ekran başlat

# Chrome driver'ı başlat
driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)

# Siteyi aç
driver.get("https://www.otomoto.pl/osobowe?search%5Badvanced_search_expanded%5D=true")

# 1 saniye bekle
time.sleep(15)

# Bundan sonra diğer adımlarını yazabilirsin
# ör: driver.find_element(...)
