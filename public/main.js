async function delRow(row, obj) {
  try {
    await axios.delete(`/resident/${row}`);
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
  } catch (err) {
    console.error(err);
  }
}

function getInCheckboxCnt(event) {
  // 선택된 목록 가져오기
  const query = 'input[name="in"]:checked';
  const selectedElements = document.querySelectorAll(query);
  // 선택된 목록의 갯수 세기
  const selectedElementsCnt = selectedElements.length;
  // 출력
  console.log(selectedElementsCnt);
  document.getElementById("resultIn").innerText = selectedElementsCnt;
}

function getOutCheckboxCnt(event) {
  const query = 'input[name="out"]:checked';
  const selectedElements = document.querySelectorAll(query);
  const selectedElementsCnt = selectedElements.length;

  document.getElementById("resultOut").innerText = selectedElementsCnt;
}
