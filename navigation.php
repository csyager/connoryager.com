<nav class="navbar navbar-expand-md navbar-light bg-orange">
  <ul class="navbar-nav">
    <li class="nav-item <?php $index ?>">
      <a class="nav-link" href="index.php">Index</a>
    </li>
    <li class="nav-item <?php $about ?>">
      <a class="nav-link" href="about.php">About Connor</a>
    </li>
    <li class="nav-item <?php $blog ?>">
      <a class="nav-link" href="blog.php">Blog</a>
    </li>
    <li class="nav-item <?php $photos ?>">
      <a class="nav-link" href="photos.php"></a>
    </li>
  </ul>
  <ul class="navbar-nav ml-auto">
      <?php
        if (isset($_SESSION['user'])){
          echo '<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">'.$_SESSION['user'].'</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="profile.php">Profile</a>
              <a class="dropdown-item" href="clearsession.php">Logout</a>
            </div>
          </li>';

        } else {
          echo '<li class="nav-item"><a href="login.php" class="btn">Login</a></li>';
        }
       ?>
  </ul>
</nav>
