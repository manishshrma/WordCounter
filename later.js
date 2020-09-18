var button = document.getElementById("btnid");

button.addEventListener("click", (e) => {
  e.preventDefault();
  var texts = document.getElementById("textarea").value;

  let words = getwords(texts);
  let wordcounter = getwordscount(words);
  let sortdata = sortwords(wordcounter);
  let res = sortcounts(sortdata);
  console.log(res);

  createtable(res);
  getchart(res);
});