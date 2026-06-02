package ua.nure.diachenko.naturalresources.data.repository

import ua.nure.diachenko.naturalresources.data.model.ObservationRequest
import ua.nure.diachenko.naturalresources.data.network.ApiClient

class ResourceRepository {
    private val api = ApiClient.service

    suspend fun loadDashboard() = api.getDashboardSummary()

    suspend fun loadObservations() = api.getObservations()

    suspend fun sendObservation(request: ObservationRequest) = api.createObservation(request)
}

