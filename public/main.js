async function delRow(row, obj) {
  try {
    await axios.delete(`/resident/${row}`);
    var tr = obj.parentNode.parentNode;
    tr.parentNode.removeChild(tr);
  } catch (err) {
    console.error(err);
  }
}
function getCheckboxCnt(event) {
  // 선택된 목록 가져오기
  const query = 'input[name="in"]:checked';
  const selectedElements = document.querySelectorAll(query);

  // 선택된 목록의 갯수 세기
  const selectedElementsCnt = selectedElements.length;

  // 출력
  document.getElementById("result").innerText = selectedElementsCnt;
}
