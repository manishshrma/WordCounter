// $('#btnid').click(()=>{
//     let texts=$('#textarea').val();
//     console.log(texts);

// })

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

function getwords(texts) {
  let chars = texts.split("");
  let newstore = [];
  chars.forEach((c) => {
    switch (c) {
      case `'`:
      case `"`:
      case `;`:
      case `:`:
      case `.`:
      case `&`:
      case `(`:
      case `)`:
      case `-`:
      case `‘`:
      case `’`:
      case `,`:
      case `”`:
      case `!`:
      case `?`:
        return;

      default:
        newstore.push(c.toLowerCase());
    }
  });
  let newtext = newstore.join("");

  let words = newtext.split(" ");

  return words;
}

function getwordscount(words) {
  let wordcount = {};

  words.forEach((w) => {
    if (wordcount[w]) {
      wordcount[w]++;
    } else {
      wordcount[w] = 1;
    }
  });
  return wordcount;
}
function sortwords(dowordscount) {
  let wc = [];

  Object.keys(dowordscount).forEach((mykey) => {
    wc.push({
      word: mykey,
      count: dowordscount[mykey],
    });
  });

  return wc;
}

function sortcounts(wc) {
  return wc.sort((obj1, obj2) => {
    return obj2.count - obj1.count; // if -ve descending trie concept
  });
}

function createtable(data) {
  var table = document.getElementById("tableid");
  var tablerow = document.getElementById("tbrid");

  data.forEach((res) => {
    var div = document.createElement("div");
    div.id = "tbrid";
    var myword = document.createTextNode(res.word);
    var mycount = document.createTextNode(res.count);

    var tc1 = document.createElement("td");
    tc1.id = "tbrid";
    tc1.style= "width:70px";
    var tc2 = document.createElement("td");
    tc2.style="height:40px; width:70px";


    tc1.appendChild(myword);
    tc2.appendChild(mycount);

    div.appendChild(tc1);
    div.appendChild(tc2);

    tablerow.appendChild(div);
  });
}


function getchart(wcarr) {
    var ctx = document.getElementById("chart").getContext("2d");

    // var mydata={
    //     xlabel:data.word,
    //     ylabel:data.count,
    // }

  var myChart = new Chart(ctx, {
    type: "line",
    data: {
        
      labels:wcarr.map(x=>x.word),
      datasets:[{
          label: "Word counter",
          data: wcarr.map(y=>y.count),
          fill: false,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            // "rgba(54, 162, 235, 0.2)",
            // "rgba(255, 206, 86, 0.2)",
            // "rgba(75, 192, 192, 0.2)",
            // "rgba(153, 102, 255, 0.2)",
            // "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            // "rgba(54, 162, 235, 1)",
            // "rgba(255, 206, 86, 1)",
            // "rgba(75, 192, 192, 1)",
            // "rgba(153, 102, 255, 1)",
            // "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}
