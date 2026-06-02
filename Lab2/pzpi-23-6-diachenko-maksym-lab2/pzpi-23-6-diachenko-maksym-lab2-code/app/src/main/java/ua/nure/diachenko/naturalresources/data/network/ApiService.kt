package ua.nure.diachenko.naturalresources.data.network

import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import ua.nure.diachenko.naturalresources.data.model.DashboardSummary
import ua.nure.diachenko.naturalresources.data.model.ObservationRequest
import ua.nure.diachenko.naturalresources.data.model.ResourceIndicator

interface ApiService {
    @GET("api/dashboard/summary")
    suspend fun getDashboardSummary(): DashboardSummary

    @GET("api/observations")
    suspend fun getObservations(): List<ResourceIndicator>

    @POST("api/observations")
    suspend fun createObservation(@Body request: ObservationRequest): ResourceIndicator
}

