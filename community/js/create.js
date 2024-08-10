

CKEDITOR.replace('editor');

document.addEventListener("DOMContentLoaded", function () {
  const headlineSelect = document.querySelector(".community_headline");
  const keywordSelect = document.querySelector(".community_keyword");
  const keywordContainer = document.querySelector(".select_bottom_box");
  const selectedKeywords = new Set();
  const MAX_KEYWORDS = 10;

  const keywordCategories = {
    property: [
      "공과금",
      "소득세",
      "주택 관련 세금",
      "재산세",
      "주거용 부가가치세",
      "지방세",
      "보험료",
    ],
    tax: [
      "공과금",
      "소득세",
      "주택 관련 세금",
      "재산세",
      "주거용 부가가치세",
      "지방세",
      "보험료",
    ],
    welfare: [
      "청년 주택",
      "대출",
      "주거 지원",
      "생활비 지원",
      "건강 보험",
      "청년수당",
      "취업 지원 프로그램",
      "의료 지원",
      "식비 지원",
      "문화 지원",
    ],
    tip: [
      "생활비",
      "취업",
      "교통비",
      "식비",
      "재테크",
      "저축",
      "생활용품",
      "인테리어",
      "건강 관리",
      "취업 지원",
      "자산 관리",
      "식생활 관리",
      "시간 관리",
      "청소",
      "의류 관리",
    ],
  };

  headlineSelect.addEventListener("change", function () {
    const selectedHeadline = this.value;
    updateKeywordOptions(selectedHeadline);
    clearSelectedKeywords(); // 말머리 변경 시 선택된 키워드 초기화
  });

  function updateKeywordOptions(headline) {
    keywordSelect.innerHTML =
      '<option value="">키워드 선택 (최대 10개)</option>';

    if (keywordCategories[headline]) {
      keywordCategories[headline].forEach((keyword) => {
        const option = document.createElement("option");
        option.value = keyword;
        option.textContent = keyword;
        keywordSelect.appendChild(option);
      });
    }
  }

  function clearSelectedKeywords() {
    selectedKeywords.clear();
    keywordContainer.innerHTML = ""; // 키워드 뱃지 모두 제거
  }

  keywordSelect.addEventListener("change", function () {
    const selectedKeyword = this.value;
    if (
      selectedKeyword &&
      !selectedKeywords.has(selectedKeyword) &&
      selectedKeywords.size < MAX_KEYWORDS
    ) {
      addKeywordBadge(selectedKeyword);
      selectedKeywords.add(selectedKeyword);
      this.selectedIndex = 0;
    } else if (selectedKeywords.size >= MAX_KEYWORDS) {
      alert("최대 10개의 키워드만 선택할 수 있습니다.");
      this.selectedIndex = 0;
    }
  });

  function addKeywordBadge(keyword) {
    const badge = document.createElement("span");
    badge.className = "keyword_btn";
    badge.textContent = keyword;

    const closeButton = document.createElement("span");
    closeButton.className = "keyword_btn_x";
    closeButton.textContent = " X";

    closeButton.addEventListener("click", function () {
      keywordContainer.removeChild(badge);
      selectedKeywords.delete(keyword);
      updateKeywordSelectOptions();
    });

    badge.appendChild(closeButton);
    keywordContainer.appendChild(badge);
    updateKeywordSelectOptions();
  }

  function updateKeywordSelectOptions() {
    Array.from(keywordSelect.options).forEach((option) => {
      if (selectedKeywords.has(option.value)) {
        option.disabled = true;
      } else {
        option.disabled = false;
      }
    });
  }
});
