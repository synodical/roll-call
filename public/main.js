async function delRow(row, obj) {
  try {
    await axios.delete(`/resident/${row}`);
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

function getResidents(name) {
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