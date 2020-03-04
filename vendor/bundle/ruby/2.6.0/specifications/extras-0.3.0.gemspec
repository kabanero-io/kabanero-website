# -*- encoding: utf-8 -*-
# stub: extras 0.3.0 ruby lib

Gem::Specification.new do |s|
  s.name = "extras".freeze
  s.version = "0.3.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jordon Bedwell".freeze]
  s.date = "2017-06-29"
  s.description = "Add some neat little extras into your Ruby stuff.".freeze
  s.email = ["jordon@envygeeks.io".freeze]
  s.homepage = "http://github.com/envygeeks/extras".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Add neat extras into your Ruby stuff.".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<forwardable-extended>.freeze, ["~> 2.5"])
  else
    s.add_dependency(%q<forwardable-extended>.freeze, ["~> 2.5"])
  end
end
