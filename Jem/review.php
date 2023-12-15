<?php
$reviewtext = $_POST['reviewtext'];
$reviewtext = "<p class=\"p\">" + $reviewtext + "</p>\n<br>";
$file = fopen("review.html", "w") or die("lol");
fwrite($file, $reviewtext);
fclose($file);
?>
<HTML lang="en">
<a href="./truck.html">Return to the beautiful truck</a>
</html>
