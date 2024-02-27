
    window.addMyCustomeElement('test-page', class extends Webolement {
        getContent() { return `
    <div class="flex middle wrap g-1 p-1">
        <h2 class="animate__animated animate__pulse">Buttons</h2>
        <button class="">Text Button</button>
        <button class="secondary">Text Button</button>
        <button class="round">Text Button</button>
        <button class="outline">Text Button</button>
        <button class="link">Text Button</button>
        <button class="" disabled>Text Button</button>
        <button class="secondary" disabled>Text Button</button>
        <button class="round" disabled>Text Button</button>
        <button class="outline" disabled>Text Button</button>
        <button class="link" disabled>Text Button</button>
    </div>
    <div class="flex middle wrap g-1 p-1">
        <button class="big">Text Button</button>
        <button class="big primary">Text Button</button>
        <button class="big round">Text Button</button>
        <button class="big outline">Text Button</button>
        <button class="big link">Text Button</button>

        <button class="big fab">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab round">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="big fab link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
    <div class="flex middle wrap g-1 p-1">
        <button class="">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Text Button</span>
        </button>
        <button class="primary">
            <span>Text Button</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="round">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Text Button</span>
        </button>
        <button class="outline">
            <span>Text Button</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Text Button</span>
        </button>




        <button class="fab">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab secondary">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab round">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab outline">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        <button class="fab link">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
                <path
                    d="M17 11.4909C17 13.1478 15.6568 14.4909 14 14.4909H4.00001C2.34316 14.4909 1.00002 13.1478 1.00001 11.4909L1 5.58183C0.999997 4.47725 1.89543 3.58182 3 3.58182H4.29327C4.96197 3.58182 5.58643 3.24762 5.95737 2.69122L6.22445 2.2906C6.59538 1.7342 7.21984 1.4 7.88855 1.4H10.1114C10.7802 1.4 11.4046 1.7342 11.7755 2.2906L12.0426 2.69122C12.4136 3.24762 13.038 3.58182 13.7067 3.58182H15C16.1046 3.58182 17 4.47725 17 5.58182V11.4909Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M9 11.5818C10.6066 11.5818 11.9091 10.2794 11.9091 8.67273C11.9091 7.06608 10.6066 5.76364 9 5.76364C7.39335 5.76364 6.0909 7.06608 6.0909 8.67273C6.0909 10.2794 7.39335 11.5818 9 11.5818Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
    <div class="flex column middle g-1 p-1">
        <h2 class="animate__animated animate__bounce">Inputs</h2>
        <div class="overflow_x_auto w100">
            <div class="flex row top g-1" style="width: max-content;">
                <label>Input Label</label>
                <div class="input-group">
                    <input type="text" placeholder="placeholder text" value="65464" />
                    <span class="sub mute"> This is help text</span>
                </div>
                <button class="primary">Button Text</button>
            </div>
            <div class="flex row top g-1" style="width: max-content;">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" value="65464" />
                    <span class="sub mute"> This is help text</span>
                </div>
                <button class="small primary">Button Text</button>
            </div>
        </div>
        <style>
            .grid {
                display: flex;
                gap: 1rem;
                flex-direction: row;
                flex-wrap: wrap;
                max-width: 1000px;
            }

            .grid>* {
                min-width: 300px;
                max-width: 100%;
                flex: 1;
            }
        </style>
        <div class="grid">
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" />
                </div>
            </div>
            <div class="flex column">
                <div class="input-group">
                    <label>Input Label</label>
                    <input class="small" type="text" required readonly placeholder="placeholder text"
                        value="This is sample text of read only input" />
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" disabled />
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" placeholder="placeholder text" value="65464" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="text" class="error" placeholder="placeholder text" value="65464" />
                    <span class="mute error"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group flex g-1">
                    <label class="input small">
                        <input type="checkbox" placeholder="placeholder text" name="checkbox" />
                        Input Label
                    </label>
                    <label class="input small">
                        <input type="checkbox" placeholder="placeholder text" name="checkbox" />
                        Input Label
                    </label>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input small flex g-1">
                    <label>
                        <input type="radio" placeholder="placeholder text" name="radio" />
                        Input Label
                    </label>
                    <label>
                        <input type="radio" placeholder="placeholder text" name="radio" />
                        Input Label
                    </label>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="color" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="date" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="datetime" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="datetime-local" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="email" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="file" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="image" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="month" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="number" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="password" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <label class="switch">
                        <input type="checkbox">
                        <span class="slider round"></span>
                    </label>
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="win10-thumb" type="range" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="range" placeholder="placeholder text" min="0" max="1" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="search" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="tel" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="time" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="url" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <input class="small" type="week" placeholder="placeholder text" />
                    <span class="mute"> This is help text</span>
                </div>
            </div>
            <div class="flex column">
                <label>Input Label</label>
                <div class="input-group">
                    <select class="small" placeholder="placeholder text">
                        <option>Default</option>
                        <option>Option 1</option>
                        <optgroup label="Option group">
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </optgroup>
                    </select>
                    <span class="mute"> This is help text</span>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h2>Cards</h2>
        <div class="flex center row wrap m-1 p-1 g-1">
            <div class="sb-1 r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="b-1 r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="pb-1 r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="shadow r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="shadow-s r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="shadow-p r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="error_bg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="success_bg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="bg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="sbg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
            <div class="pbg r-1 p-1" style="width: 150px; height: 200px;">
                <p>Some Sample text</p>
            </div>
        </div>
    </div>
    <div class="flex wrap center m-1 p-1 g-1">
        <button @click="showModel">Show Model</button>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_bottom'" @input="set_model_side"
                    value="from_bottom">
                <span class="slider round"></span>
            </label>
            <span class="mute"> From Bottom</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_top'" @input="set_model_side"
                    value="from_top">
                <span class="slider round"></span>
            </label>
            <span class="mute"> From Top</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_left'" @input="set_model_side"
                    value="from_left">
                <span class="slider round"></span>
            </label>
            <span class="mute"> From Left</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="radio" name="model_side" :checked="model_side == 'from_right'" @input="set_model_side"
                    value="from_right">
                <span class="slider round"></span>
            </label>
            <span class="mute">From Right</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="checkbox" :checked="fullscreen_model" @input="set_model_fullscreen">
                <span class="slider round"></span>
            </label>
            <span class="mute">Full screen</span>
        </div>
        <div class="input-group">
            <label class="switch">
                <input type="checkbox" :checked="fullwidth_model" @input="set_model_fullwidth">
                <span class="slider round"></span>
            </label>
            <span class="mute">Full width</span>
        </div>
    </div>
    <div class="flex center wrap g-1">
            <button class="big" :class="loadingBtn?'loading':''" @click="startLoadingBtn">Show Loading</button>
            <button :class="loadingBtn?'loading':''" @click="startLoadingBtn">Show Loading</button>
    </div>
    <loading-div :value="loading" :full_screen="loading_fullscreen">
        <div class="flex center m-1 p-1">
            <button class="big" @click="startLoading">Show Loading</button>
            <div class="input-group">
                <label class="switch">
                    <input type="checkbox" :checked="loading_fullscreen" @input="switchLoadingFullscreen">
                    <span class="slider round"></span>
                </label>
                <span class="mute"> Show loading fullscreen</span>
            </div>
        </div>
    </loading-div>
    <div class="flex center m-1 p-1">
        <color-scheme-btn></color-scheme-btn>
    </div>
    <modal-view :value="ShowingModel" @closed="model_closed"
        :model_class="model_side+(fullscreen_model?' full_screen':'')+(fullwidth_model?' full_width':'')">
        <div style="display: flex;justify-content: center;text-align: center;flex-direction: column;">
            <img src="/img/success.png" style="margin: auto;">
            <h2>Sample Modal</h2>
            <p style="width: 257px;">Sample Model View Content</p>
            <button class="btn" @click="showModel"> Got It! </button>
        </div>
    </modal-view>
` }
        getData() {
            return {
                ShowingModel: false,
                loading: false,
                loadingBtn : false,
                loading_fullscreen: false,
                model_side: "",
                fullscreen_model: false,
                fullwidth_model: false,
            }
        }
        startLoadingBtn(event){
            debugger
            this.data.loadingBtn = !this.data.loadingBtn
        }
        set_model_fullwidth(event) {
            this.data.fullwidth_model = event.target.checked
        }
        set_model_fullscreen(event) {
            this.data.fullscreen_model = event.target.checked
        }
        set_model_side(event) {
            if (event.target.checked) {
                this.data.model_side = event.target.value
            }
        }
        model_closed() {
            this.data.ShowingModel = false
        }
        showModel() {
            this.data.ShowingModel = !this.data.ShowingModel
        }
        startLoading() {
            this.data.loading = true
            setTimeout(() => {
                this.data.loading = false
            }, 5000);
        }
        switchLoadingFullscreen(event) {
            this.data.loading_fullscreen = event.target.checked
        }
    });
