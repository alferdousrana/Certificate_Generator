const bindText = (inputId, outputId, fallback = '') => {
  const input = document.getElementById(inputId);
  const output = document.getElementById(outputId);
  const update = () => {
    output.textContent = input.value.trim() || fallback;
  };
  input.addEventListener('input', update);
  update();
};

bindText('studentName', 'studentNameOutput', 'Student Name');
bindText('courseName', 'courseNameOutput', 'Course Name');
bindText('issueDate', 'issueDateOutput', '00 Month 0000');
bindText('certificateId', 'certificateIdOutput', 'CERT-0000');
bindText('categoryName', 'categoryOutput', 'CATEGORY');
bindText('credits', 'creditsOutput', '10 ECTS');
bindText('competency', 'competencyOutput', 'Competency Verified');
bindText('statusAwarded', 'statusAwardedOutput', 'Status Awarded');
bindText('verifyText', 'verifyTextOutput', 'Scan to verify · ikonskills.ac');

const setupImageUpload = ({
  inputId,
  imgId,
  placeholderId = null,
  fallbackId = null
}) => {
  const input = document.getElementById(inputId);
  const img = document.getElementById(imgId);
  const placeholder = placeholderId ? document.getElementById(placeholderId) : null;
  const fallback = fallbackId ? document.getElementById(fallbackId) : null;

  input.addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      img.src = '';
      img.classList.remove('active');
      if (placeholder) placeholder.style.display = '';
      if (fallback) fallback.style.display = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      img.src = reader.result;
      img.classList.add('active');
      if (placeholder) placeholder.style.display = 'none';
      if (fallback) fallback.style.display = 'none';
    };
    reader.readAsDataURL(file);
  });
};

setupImageUpload({
  inputId: 'qrUpload',
  imgId: 'qrImg',
  placeholderId: 'qrPlaceholder'
});

setupImageUpload({
  inputId: 'signatureUpload',
  imgId: 'signatureImg',
  placeholderId: 'signaturePlaceholder'
});

setupImageUpload({
  inputId: 'sealUpload',
  imgId: 'sealImg',
  placeholderId: 'sealPlaceholder'
});

setupImageUpload({
  inputId: 'topRightLogoUpload',
  imgId: 'topRightLogoImg',
  fallbackId: 'topRightLogoFallback'
});

document.getElementById('printBtn').addEventListener('click', () => window.print());

document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('studentName').value = 'Alexandra Reyes';
  document.getElementById('courseName').value = 'AI Prompt Engineer';
  document.getElementById('issueDate').value = '05 April 2026';
  document.getElementById('certificateId').value = 'IKSC-2026-00142';
  document.getElementById('categoryName').value = 'ARTIFICIAL INTELLIGENCE & TECHNOLOGY';
  document.getElementById('credits').value = '10 ECTS';
  document.getElementById('competency').value = 'Competency Verified';
  document.getElementById('statusAwarded').value = 'IKON Practitioner Status Awarded';
  document.getElementById('verifyText').value = 'Scan to verify · ikonskills.ac';

  ['studentName', 'courseName', 'issueDate', 'certificateId', 'categoryName', 'credits', 'competency', 'statusAwarded', 'verifyText']
    .forEach(id => document.getElementById(id).dispatchEvent(new Event('input')));

  ['qrUpload', 'signatureUpload', 'sealUpload', 'topRightLogoUpload'].forEach(id => {
    const input = document.getElementById(id);
    input.value = '';
    input.dispatchEvent(new Event('change'));
  });
});
