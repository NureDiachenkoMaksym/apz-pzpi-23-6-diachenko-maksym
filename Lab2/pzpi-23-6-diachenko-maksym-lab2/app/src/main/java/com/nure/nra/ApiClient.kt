package com.nure.nra

class ApiClient(private val baseUrl: String) {
    fun getResourceRecords(resourceType: String): List<ResourceRecord> {
        // In a real application this method calls REST API.
        return listOf(ResourceRecord(resourceType, "Харківська область", "2026-Q1", 75.0))
    }

    fun sendObservation(observation: FieldObservation): Boolean {
        // In a real application this method sends a field observation to the server.
        return true
    }
}
