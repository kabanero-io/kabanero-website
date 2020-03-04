# -*- encoding: utf-8 -*-
# stub: json-minify 0.0.3 ruby lib

Gem::Specification.new do |s|
  s.name = "json-minify".freeze
  s.version = "0.0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Geoff Youngs\n\n\n".freeze]
  s.date = "2016-09-30"
  s.description = "Pre-parser for JSON that removes C/C++ style comments and whitespace from formatted JSON, similar to https://github.com/getify/JSON.minify.".freeze
  s.email = ["git@intersect-uk.co.uk".freeze]
  s.homepage = "http://github.com/geoffyoungs/json-minify-rb".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "JSON.minify implementation".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<bundler>.freeze, ["~> 1.5"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 10.1"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.2"])
    s.add_runtime_dependency(%q<json>.freeze, ["> 0"])
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.5"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.1"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.2"])
    s.add_dependency(%q<json>.freeze, ["> 0"])
  end
end
