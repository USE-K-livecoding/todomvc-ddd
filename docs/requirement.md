# 要求

* TODO
    * TODO タイトルを入力できる
        * トリムされる
    * TODO タイトルを入力として TODO を生成する
        * 空文字は例外とする
    * TODO 生成時には ID を自動採番する
    * TODO の初期状態は Active である
    * TODO を完了すると TODO の状態は Completed になる
    * TODO の状態を Completed から Active に戻すことができる
    * TODO タイトルは TODO 生成後変更することができる
        * 空文字は TODO を削除する
* TODO list
    * 状態が Completed である TODO をすべて削除することができる
    * 同一の TODO タイトルを許容する
    * すべての TODO の状態が Completed である時，すべての TODO の状態を Active にすることができる
    * いずれかの TODO の状態が Active である時，すべての TODO の状態を Completed にすることができる
