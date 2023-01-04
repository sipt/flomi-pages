(() => {
  'use strict'

  const getOS = () => {
    if (navigator.userAgent.indexOf('Window') > 0) {
      return 'Windows'
    }

    if (navigator.userAgent.indexOf('Mac OS X') > 0) {
      return 'Mac'
    }

    if (navigator.userAgent.indexOf('Linux') > 0) {
      return 'Linux'
    }

    return 'NUll'
  }

  const setDownloadUrl = function (os) {
    const downloadApp = document.querySelector('#download-app')
    const version = downloadApp.getAttribute('data-flomi-version')
    const activeBtn = document.querySelector('.os-icon-active use')
    if (os === 'Windows') {
      downloadApp.setAttribute('href', `https://github.com/sipt/flomi-rls/releases/download/v${version}/flomi-${version}.Setup.exe`)
      activeBtn.setAttribute('href', '#windows')
    } else if (os === 'Mac') {
      downloadApp.setAttribute('href', `https://github.com/sipt/flomi-rls/releases/download/v${version}/flomi-darwin-universal-${version}.zip`)
      activeBtn.setAttribute('href', '#apple')
    }
    const btnToActive = document.querySelector(`[data-os-value="${os}"]`)
    document.querySelectorAll('[data-os-value]').forEach(element => {
      element.classList.remove('active')
    })
    btnToActive.classList.add('active')
  }

  setDownloadUrl(getOS())

  window.addEventListener('DOMContentLoaded', () => {
    setDownloadUrl(getOS())

    document.querySelectorAll('[data-os-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const os = toggle.getAttribute('data-os-value')
          setDownloadUrl(os)
        })
      })
  })
})()
