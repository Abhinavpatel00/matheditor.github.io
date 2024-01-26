function convert() {
    var input = document.getElementById("input").value.trim();
    var output = document.getElementById('output');
    output.innerHTML = '';

    MathJax.texReset();
    var options = MathJax.getMetricsFor(output);

    MathJax.tex2chtmlPromise(input, options).then(function (node) {
      output.appendChild(node);
      MathJax.startup.document.clear();
      MathJax.startup.document.updateDocument();
    }).catch(function (err) {
      output.appendChild(document.createElement('pre')).appendChild(document.createTextNode(err.message));
    });
  }

  function toggleLinks() {
    var navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('show-links');
  }

  function loadFile() {
    var input = document.getElementById("file-upload");
    var file = input.files[0];

    if (file) {
      var reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("input").value = e.target.result;
        convert();
      };
      reader.readAsText(file);
    }
  }

  function newFile() {
    document.getElementById("input").value = "";
    convert();
  }


  function exportPDF() {
    var element = document.getElementById('output-container');
    html2pdf(element);
  }

  function exportTex() {
    // You can implement custom functionality for exporting as Tex
    alert("Exporting Tex");
  }

  function exportDocx() {
    var input = document.getElementById("input").value;
    mammoth.convertToHtml({ "value": input })
      .then(displayResult)
      .catch(handleError);

    function displayResult(result) {
      var docxContent = result.value;
      var link = document.createElement('a');
      link.href = URL.createObjectURL(new Blob([docxContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }));
      link.download = 'document.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    function handleError(err) {
      console.error(err);
      alert("Error exporting Docx");
    }
  }
  function toggleTheme() {
    document.body.classList.toggle("dark-theme");
  }
  function toggleOptions() {
    var hambergerOptions = document.getElementById('hamberger-options');
    hambergerOptions.style.display = (hambergerOptions.style.display === 'block') ? 'none' : 'block';
  }

