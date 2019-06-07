<?php echo '
<nav class="navbar navbar-expand-md navbar-dark" style="background-color: #e69138ff">
  <a class="navbar-brand" href="index.php">Connor Yager</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item">
      <a class="nav-link" href="index.php">Index</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="about.php">About Connor</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="blog.php">Blog</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="photos.php"></a>
    </li>
  </ul>
  <ul class="navbar-nav my-2 my-lg-0">
      ';
        if (isset($_SESSION['user'])){
          echo '<li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'.$_SESSION['user'].'</a>
            <div class="dropdown-menu aria-labelledby="navbarDropdown"">
              <a class="dropdown-item" href="profile.php">Profile</a>
              <a class="dropdown-item" href="clearsession.php">Logout</a>
            </div>
          </li>';

        } else {
          echo '<li class="nav-item"><a href="login.php" class="btn">Login</a></li>';
        }
       echo '
  </ul>
  </div>
</nav>
'; ?>
