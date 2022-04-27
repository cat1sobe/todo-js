import "./styles.css";

const onClickAdd = () => {
  const addText = document.getElementById("input-todo").value;
  document.getElementById("input-todo").value = "";

  createIncompleteList(addText);

  // //divタグの子要素に各要素を設定
  // li.appendChild(div);
  // div.appendChild(pp);
  // div.appendChild(buttonComplete);
  // div.appendChild(buttonDelete);

  // //htmlに反映
  // document.getElementById("incomplete-list").appendChild(li);
};

//未完了から要素を取り除く（表示上）
const deleteItemFromIncompleteList = (tag) => {
  const deleteTargetChild = tag.parentNode;
  const deleteTarget = deleteTargetChild.parentNode;
  document.getElementById("incomplete-list").removeChild(deleteTarget);
};

//完了ボタン押下時処理
const onClickComplete = (itemText) => {
  //genelate dom
  const li = document.createElement("li");

  //div generate
  const div = document.createElement("div");
  div.className = "list-row";

  //pタグ設定
  const pp = document.createElement("p");
  // pp.className = "item";
  pp.innerText = itemText;

  const buttonReturn = document.createElement("button");
  buttonReturn.innerText = "戻す";

  li.appendChild(div);
  div.appendChild(pp);
  div.appendChild(buttonReturn);

  document.getElementById("complete-list").appendChild(li);

  //戻るボタン押下アクション時
  buttonReturn.addEventListener("click", () => {
    //要素を削除する
    const target = buttonReturn.parentNode.parentNode;
    document.getElementById("complete-list").removeChild(target);
    //対象domからテキストを取得する
    const returnText = li.firstElementChild.firstElementChild.innerText;
    onClickReturn(returnText);
  });
};

/**
 * 引数:対象のアイテム
 * 内容:対象のアイテムを完了リストから削除し、未完了リストに生成
 */
const onClickReturn = (item) => {
  createIncompleteList(item);
};

//未完了リストを追加するロジック
const createIncompleteList = (item) => {
  //各種タグ作成
  const li = document.createElement("li");
  const div = document.createElement("div");
  div.className = "list-row";
  const pp = document.createElement("p");
  const buttonComplete = document.createElement("button");
  buttonComplete.innerText = "完了";
  const buttonDelete = document.createElement("button");
  buttonDelete.innerText = "削除";

  //取得したTODOをpタグに設定
  pp.innerText = item;

  //complete button
  buttonComplete.addEventListener("click", () => {
    //完了したタスクを未完了一覧から削除
    deleteItemFromIncompleteList(buttonComplete);

    //完了したタスクを完了リストに追加
    //該当のpタグからitemをとってくる
    const addTarget = buttonComplete.parentNode.parentNode;
    const text = addTarget.firstElementChild.firstElementChild.innerText;
    onClickComplete(text);
  });

  //削除ボタン押下時アクション
  buttonDelete.addEventListener("click", () => {
    deleteItemFromIncompleteList(buttonDelete);
  });

  //タグを挿入できる形にまとめる
  li.appendChild(div);
  div.appendChild(pp);
  div.appendChild(buttonComplete);
  div.appendChild(buttonDelete);

  document.getElementById("incomplete-list").appendChild(li);
};

//入力ボタン押下時処理
document
  .getElementById("add-button")
  .addEventListener("click", () => onClickAdd());

// const item = document.getElementsByClassName("item");
// console.log(item[0]);
// document
//   .getElementById("complete-button")
//   .addEventListener("click", () => onClickComplete(item));
