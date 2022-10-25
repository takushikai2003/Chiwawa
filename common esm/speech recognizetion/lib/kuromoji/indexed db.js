window.indexedDB      = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange    = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

let db;
const dbName = "TestDB";//kuromoji_dict_data
const objStoreName = "Test1";//base.dat.gz

function openDB() {
    //  データベースオープン:[名称:TestDB]
    const request = indexedDB.open(dbName);
    //DBが存在しない場合、またはバージョン引数よりも小さい場合の作成処理
    request.onupgradeneeded = function(event) {
        //データベースインスタンス保存
        db = event.target.result;
        db.onerror = function(event) {  //エラー処理
            console.log("DBの作成に失敗しました。");
        };
 
        //オブジェクトストア名の確認
        if (!db.objectStoreNames.contains(objStoreName)) {
            //オブジェクトストアが無い場合
            const objStoreKey = { keyPath: "id" };    //キー設定
            //オブジェクトストア生成
            db.createObjectStore(objStoreName, objStoreKey);
            console.log("オブジェクトストア生成");
        }
    };

    //オープンが正常の場合の関数宣言
    request.onsuccess = function(event) {
        //データベースインスタンス保存
        db = event.target.result;
        console.log("DBオープンOK");
    };

    //エラーの場合の関数宣言
    request.onerror = function(event){
        console.log("DBオープンエラー");
    };
}


function addData(_data) {
    //トランザクション
    const transaction = db.transaction(objStoreName, "readwrite");
    //オブジェクトストアにアクセスします。
    const objectStore = transaction.objectStore(objStoreName);
    //オブジェクトストアに追加のリクエストします。
    const data = {
        id: "1" ,         //キーデータ
        data: _data
    };
               
    const request = objectStore.add(data);
    //追加正常の場合の関数宣言
    request.onsuccess = function(event) {
        console.log("保存成功");
    };
    //追加エラーの場合の関数宣言
    request.onerror = function(event) {
        console.log("保存失敗。event:", event);
    };
}

function getData(id) {
    const transaction = db.transaction(objStoreName, "readonly");
    const objectStore = transaction.objectStore(objStoreName);
    const request = objectStore.get(id);
    
    //取得が成功した場合の関数宣言
    request.onsuccess = function(event) {
        const result = event.target.result;
        console.log("データ:", result);
    };
    //取得エラーの場合の関数宣言
    request.onerror = function(event) {
        console.log("取得失敗。event:", event);
    };
}