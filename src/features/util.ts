export const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>, fuc:Function) => {
  if (e.target.files![0]) {
    // null or undefinedじゃないよとtypescriptに伝える
    fuc(e.target.files![0]);
    e.target.value = ""; // File選択時に同じファイルだとonChangeが動作しないので、一度から文字とする
  }
};