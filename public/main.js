async function delRow(row, obj) {
  try {
    await axios.delete(`/residents/${row}`);
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
  } catch (err) {
    console.error(err);
  }
}

function getCheckboxCnt(name) {
  // 선택된 목록 가져오기
  const query = `input[name="${name}"]:checked`;
  const selectedElements = document.querySelectorAll(query);
  // 선택된 목록의 갯수 세기
  const selectedElementsCnt = selectedElements.length;
  // 출력
  document.getElementById(`result-${name}`).innerText = selectedElementsCnt;
}

function getResidentsPenalty(name) {
  const query = `input[name="${name}"]:checked`;
  const selectedElements = document.querySelectorAll(query);
  let result = "";
  selectedElements.forEach((el, index) => {
    let tr = el.parentNode.parentNode.parentNode;
    let Rroom = tr.firstElementChild;
    let Rname = tr.children[1];

    result += Rroom.textContent + " " + Rname.textContent;
    // 마지막 단어는 쉼표 없애기
    if (index !== selectedElements.length - 1) {
      result += ", ";
    }
  });
  document.getElementById(`${name}-room`).innerText = result;
}

function saveCheckbox(name) {
  var checkbox = document.getElementById(name);
  localStorage.setItem(name, checkbox.checked);
}

function getAllCheckbox(numResidents) {
  // 배열 string states[] 만들어서 상태 저장 후
  // Iteration으로 상태 바꿔서 localStorage의 checkbox 불러오기
  const states = ["ok", "out", "no", "in"];
  for (let i = 0; i < states.length; i++) {
    for (var j = 1; j <= parseInt(numResidents); j++) {
      var checked = JSON.parse(localStorage.getItem(states[i] + j));
      document.getElementById(states[i] + j).checked = checked;
    }
    getCheckboxCnt(states[i]);
    if (states[i] === "out" || states[i] === "no") {
      getResidentsPenalty(states[i]);
    }
  }
}

function deleteCheckbox() {
  localStorage.clear();
}

function isOK(name) {
  // 선택된 목록 가져오기
  const isChecked = document.querySelector(`input[name=${name}]`).checked;
  let result = "";
  if (isChecked) {
    result = "정상";
  } else {
    result = "교체 예정";
  }
  document.getElementById(`result-${name}`).innerText = result;
}
