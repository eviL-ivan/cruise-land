#!/usr/bin/env python3
"""
Скрипт для извлечения изображений из PDF файла
"""

import os
import sys
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("Ошибка: Необходимо установить PyMuPDF")
    print("Запустите: pip install PyMuPDF")
    sys.exit(1)


def extract_images_from_pdf(pdf_path, output_dir):
    """
    Извлекает все изображения из PDF и сохраняет в указанную папку

    Args:
        pdf_path: путь к PDF файлу
        output_dir: папка для сохранения изображений
    """
    # Создаем папку для изображений, если её нет
    os.makedirs(output_dir, exist_ok=True)

    # Открываем PDF
    pdf_document = fitz.open(pdf_path)

    image_count = 0

    # Проходим по всем страницам
    for page_num in range(len(pdf_document)):
        page = pdf_document[page_num]

        # Получаем список изображений на странице
        image_list = page.get_images()

        print(f"Страница {page_num + 1}: найдено {len(image_list)} изображений")

        # Извлекаем каждое изображение
        for img_index, img in enumerate(image_list):
            xref = img[0]  # xref - это ID изображения

            # Получаем изображение
            base_image = pdf_document.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]

            # Формируем имя файла
            image_filename = f"page_{page_num + 1}_img_{img_index + 1}.{image_ext}"
            image_path = os.path.join(output_dir, image_filename)

            # Сохраняем изображение
            with open(image_path, "wb") as image_file:
                image_file.write(image_bytes)

            image_count += 1
            print(f"  Сохранено: {image_filename}")

    pdf_document.close()

    print(f"\nВсего извлечено изображений: {image_count}")
    print(f"Сохранено в: {output_dir}")


if __name__ == "__main__":
    # Путь к PDF файлу
    pdf_file = "data/cape.pdf"

    # Папка для сохранения изображений
    output_folder = "data/cape_images"

    # Проверяем существование PDF файла
    if not os.path.exists(pdf_file):
        print(f"Ошибка: Файл {pdf_file} не найден!")
        sys.exit(1)

    print(f"Извлечение изображений из: {pdf_file}")
    print(f"Сохранение в: {output_folder}\n")

    # Извлекаем изображения
    extract_images_from_pdf(pdf_file, output_folder)
