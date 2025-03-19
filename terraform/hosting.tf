resource "google_firebase_hosting_site" "default" {
    provider = google-beta
    project = "shopping-list-dev"
    site_id = "shopping-list-react"
}