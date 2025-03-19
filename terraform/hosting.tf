resource "google_storage_bucket" "react_app_bucket" {
  name     = "shopping-list-react"
  location = "EU"
  storage_class = "STANDARD"
}