package com.nure.nra

data class ResourceRecord(
    val resourceType: String,
    val territory: String,
    val period: String,
    val value: Double
)

data class FieldObservation(
    val latitude: Double,
    val longitude: Double,
    val resourceType: String,
    val comment: String
)
