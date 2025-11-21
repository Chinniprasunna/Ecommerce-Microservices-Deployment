package com.ecommerce.sellerservice.dto;

public class LoginResponse {
    private boolean success;
    private String message;
    private String token;
    private Long sellerId;

    public LoginResponse() {}

    public LoginResponse(boolean success, String message, String token, Long sellerId) {
        this.success = success;
        this.message = message;
        this.token = token;
        this.sellerId = sellerId;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Long getSellerId() {
        return sellerId;
    }

    public void setSellerId(Long sellerId) {
        this.sellerId = sellerId;
    }
}

