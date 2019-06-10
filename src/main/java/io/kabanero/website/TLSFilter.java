/******************************************************************************
 *
 * Copyright 2019 IBM Corporation and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 ******************************************************************************/

package io.kabanero.website;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletRequest;

public class TLSFilter implements Filter {
    public void destroy() {
    }

    public void init(FilterConfig cfg) {
    }

    public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain)
            throws IOException, ServletException {

        HttpServletResponse response = ((HttpServletResponse)resp);

        if ("http".equals(req.getScheme())) {
          response.setStatus(HttpServletResponse.SC_MOVED_PERMANENTLY); // HTTP 301
          response.setHeader("Location", ((HttpServletRequest)req).getRequestURL().replace(0, 4, "https").toString());
        } else if ("https".equals(req.getScheme())) {
          response.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains"); // Tell browsers that this site should only be accessed using HTTPS, instead of using HTTP. IncludeSubDomains and 1 year set per OWASP.
          response.setHeader("X-Frame-Options", "SAMEORIGIN"); // Prevent framing of this website.
          response.setHeader("X-XSS-Protection", "1; mode=block"); // Cross-site scripting prevention for Chrome, Safari, and IE. It's not necessary with newer browser versions that support the Content-Security-Policy but it helps prevent XSS on older versions of these browsers.
          response.setHeader("X-Content-Type-Options", "nosniff"); // Stops a browser from trying to MIME-sniff the content type.
          response.setHeader("Content-Security-Policy", "default-src 'self' 'unsafe-inline' maxcdn.bootstrapcdn.com fonts.googleapis.com ajax.googleapis.com fonts.gstatic.com  *.githubusercontent.com api.github.com www.googletagmanager.com tagmanager.google.com www.google-analytics.com cdnjs.cloudflare.com *.twitter.com *.twimg.com https://www.youtube.com data:"); // Mitigating cross site scripting (XSS) from other domains.
          response.setHeader("Referrer-Policy", "no-referrer"); // Limits the information sent cross-domain and does not send the origin name.

          String uri = ((HttpServletRequest)req).getRequestURI();
          if(uri.startsWith("/img/")) {
              response.setHeader("Cache-Control", "max-age=604800");
          } else if (uri.startsWith("/api/builds/") || uri.startsWith("/api/github/")) {
              response.setHeader("Cache-Control", "no-store");
              response.setHeader("Pragma", "no-cache");
          } else {
              response.setHeader("Cache-Control", "no-cache");
          }
        }
        chain.doFilter(req, resp);
    }
}
