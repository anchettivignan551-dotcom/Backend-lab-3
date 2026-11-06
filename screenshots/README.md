# Postman & Execution Screenshots Guide

This folder holds screenshots proving test results for each endpoint.
You can take screenshots in Postman or VS Code and place them here using the following filenames:

| Filename | Description | Status Code |
| :--- | :--- | :--- |
| `01_get_books_default.png` | GET /books/ returning list of books | `200 OK` |
| `02_get_books_search.png` | GET /books/?search_q=Clean | `200 OK` |
| `03_get_books_sort.png` | GET /books/?order_by=price&order=DESC | `200 OK` |
| `04_get_books_price_range.png` | GET /books/?min_price=300&max_price=500 | `200 OK` |
| `05_get_books_pagination.png` | GET /books/?limit=3&offset=0 | `200 OK` |
| `06_get_book_by_id_200.png` | GET /books/1/ | `200 OK` |
| `07_get_book_404.png` | GET /books/999999/ | `404 Not Found` |
| `08_post_book_201.png` | POST /books/ with valid JSON body | `201 Created` |
| `09_post_validation_400.png` | POST /books/ with missing field | `400 Bad Request` |
| `10_put_book_200.png` | PUT /books/1/ updated title/price | `200 OK` |
| `11_delete_book_200.png` | DELETE /books/1/ removed book | `200 OK` |
| `12_test_suite_all_pass.png` | Terminal output of `npm test` showing 18/18 PASS | CLI Output |
