from google.cloud import error_reporting

class ErrorManager:
  def __init__(self, location):
    self.location = location
    self.client_error = error_reporting.Client()

  def report(self, message):
      self.client_error.report(f"[{self.location}] {message}")
      return